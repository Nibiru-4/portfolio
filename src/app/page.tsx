"use client"

import { ArrowUpRight, Mail, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { ProjectCard } from "@/components/project-card"
import { GithubIcon } from "@/components/icons"
import { useContactDialog } from "@/components/contact-dialog"
import { profile } from "@/lib/profile"
import { projects } from "@/lib/projects"

export default function Home() {
  const openContactDialog = useContactDialog()

  return (
    <>
      <SiteHeader />
      <main id="top" className="mx-auto w-full max-w-4xl flex-1 px-6">
        {/* Hero */}
        <section className="flex flex-col items-start gap-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {profile.location}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="max-w-md text-balance text-muted-foreground">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button
                nativeButton={false}
                render={<a href={profile.githubUrl} target="_blank" rel="noreferrer" />}
              >
                <GithubIcon className="size-4" />
                GitHub
              </Button>
              <Button variant="outline" onClick={openContactDialog}>
                <Mail />
                Me contacter
              </Button>
            </div>
          </div>
          <Avatar size="lg" className="size-24 sm:size-28">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </section>

        <Separator />

        {/* Projects */}
        <section id="projects" className="scroll-mt-16 py-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Projets</h2>
              <p className="text-sm text-muted-foreground">
                Une sélection de dépôts issus de mon{" "}
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  profil GitHub
                </a>
                .
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <Separator />

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 py-16">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Une question, une opportunité, envie de discuter d&apos;un projet ?
            N&apos;hésitez pas à me contacter.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button onClick={openContactDialog}>
              <Mail />
              {profile.email}
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={profile.githubUrl} target="_blank" rel="noreferrer" />}
            >
              <GithubIcon className="size-4" />
              @{profile.githubUsername}
              <ArrowUpRight />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-2 px-6 text-xs text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Construit avec Next.js et shadcn/ui</span>
        </div>
      </footer>
    </>
  )
}
