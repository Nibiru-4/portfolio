import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GithubIcon } from "@/components/icons"
import { profile } from "@/lib/profile"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <Link href="#top" className="text-sm font-medium tracking-tight">
          {profile.name}
        </Link>
        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="#projects" />}
          >
            Projets
          </Button>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="#contact" />}
          >
            Contact
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            nativeButton={false}
            render={<a href={profile.githubUrl} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="size-4" />
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
