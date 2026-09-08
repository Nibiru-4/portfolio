export type Project = {
  slug: string
  title: string
  description: string
  language: string | null
  repoUrl: string
  demoUrl?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "numerodis",
    title: "Numerodis",
    description:
      "Monorepo Nx full-stack combinant une API NestJS (TypeORM / PostgreSQL) et une interface Vue 3.",
    language: "TypeScript",
    repoUrl: "https://github.com/Nibiru-4/numerodis",
    featured: true,
  },
  {
    slug: "mod-crs",
    title: "ScheduleCraft",
    description: "Mod Minecraft écrit en Java.",
    language: "Java",
    repoUrl: "https://github.com/Nibiru-4/Mod-CRS",
    featured: true,
  },
  {
    slug: "lupe",
    title: "Lupe",
    description:
      "Application iOS native en Swift, accompagnée de son propre backend.",
    language: "Swift",
    repoUrl: "https://github.com/Nibiru-4/lupe",
    featured: true,
  },
  {
    slug: "blinded",
    title: "Blinded",
    description:
      "Simulateur de draft pour League of Legends construit avec Next.js et l'API Riot Games.",
    language: "TypeScript",
    repoUrl: "https://github.com/Nibiru-4/Blinded",
    demoUrl: "https://blinded-sigma.vercel.app",
    featured: true,
  },
  {
    slug: "fast-component-generator",
    title: "Fast Component Generator",
    description:
      "CLI générant rapidement des composants de projet, basée sur @clack/prompts.",
    language: "JavaScript",
    repoUrl: "https://github.com/Nibiru-4/FastComponentGenerator",
  },
  {
    slug: "shareloc",
    title: "ShareLoc",
    description:
      "Application de gestion de colocation développée en équipe lors d'un projet académique.",
    language: "Java",
    repoUrl: "https://github.com/Nibiru-4/ShareLoc",
  },
  {
    slug: "le-voyageur",
    title: "Le Voyageur",
    description:
      "Projet académique de planification de voyage, réalisé en deuxième semestre de BUT.",
    language: "JavaScript",
    repoUrl: "https://github.com/Nibiru-4/LeVoyageur",
  },
  {
    slug: "aoc-2024",
    title: "Advent of Code 2024",
    description: "Résolutions des énigmes quotidiennes de l'Advent of Code 2024.",
    language: "JavaScript",
    repoUrl: "https://github.com/Nibiru-4/AOC2K24",
  },
  {
    slug: "aoc-2022",
    title: "Advent of Code 2022",
    description: "Résolutions des énigmes quotidiennes de l'Advent of Code 2022.",
    language: "JavaScript",
    repoUrl: "https://github.com/Nibiru-4/AOC2K22",
  },
]
