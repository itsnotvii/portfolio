export interface TechItem {
  name: string
  icon: string
}

export interface Project {
  id: number
  title: string
  description: string
  bullets: string[]
  tech: TechItem[]
  github?: string
  live?: string
  image?: string
}