import { ArrowUpRight } from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/icons"
import type { Project } from "@/lib/projects"

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Java: "bg-orange-500",
  Swift: "bg-orange-400",
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{project.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        {project.language ? (
          <Badge variant="outline" className="gap-1.5 font-normal">
            <span
              className={`size-2 rounded-full ${
                LANGUAGE_COLORS[project.language] ?? "bg-muted-foreground"
              }`}
            />
            {project.language}
          </Badge>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1">
          {project.demoUrl && (
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={
                <a href={project.demoUrl} target="_blank" rel="noreferrer" />
              }
            >
              Démo
              <ArrowUpRight />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Voir ${project.title} sur GitHub`}
            nativeButton={false}
            render={<a href={project.repoUrl} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="size-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
