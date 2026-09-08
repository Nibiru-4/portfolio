"use client"

import * as React from "react"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Status = "idle" | "sending" | "sent" | "error"

const ContactDialogContext = React.createContext<(() => void) | null>(null)

export function useContactDialog() {
  const openDialog = React.useContext(ContactDialogContext)
  if (!openDialog) {
    throw new Error("useContactDialog must be used within ContactDialogProvider")
  }
  return openDialog
}

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState<Status>("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  const openDialog = React.useCallback(() => {
    setStatus("idle")
    setErrorMessage("")
    setOpen(true)
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus("sending")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? "L'envoi a échoué.")
      }

      setStatus("sent")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "L'envoi a échoué."
      )
    }
  }

  return (
    <ContactDialogContext.Provider value={openDialog}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Me contacter</DialogTitle>
            <DialogDescription>
              Écris-moi un message, je te répondrai directement par email.
            </DialogDescription>
          </DialogHeader>

          {status === "sent" ? (
            <p className="py-4 text-sm text-muted-foreground">
              Message envoyé, merci ! Je te réponds au plus vite.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Honeypot field, hidden from real visitors */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-name">Nom</Label>
                <Input id="contact-name" name="name" required maxLength={100} />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={5}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}

              <DialogFooter>
                <Button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send />
                  )}
                  Envoyer
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  )
}
