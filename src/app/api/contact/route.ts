import { NextResponse } from "next/server"
import { Resend } from "resend"

import { profile } from "@/lib/profile"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 })
  }

  const { name, email, message, company } = body as Record<string, unknown>

  // Honeypot: real visitors never fill this hidden field.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true })
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 1 ||
    name.trim().length > 100 ||
    !EMAIL_RE.test(email.trim()) ||
    message.trim().length < 1 ||
    message.trim().length > 5000
  ) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "L'envoi d'email n'est pas configuré." },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: `Portfolio <onboarding@resend.dev>`,
    to: profile.email,
    replyTo: email.trim(),
    subject: `Nouveau message de ${name.trim()} via axem.me`,
    text: `${message.trim()}\n\n—\n${name.trim()} <${email.trim()}>`,
  })

  if (error) {
    return NextResponse.json({ error: "L'envoi a échoué." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
