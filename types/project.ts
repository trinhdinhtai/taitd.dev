import { Project, Stack } from "@prisma/client"

export interface EntireProject extends Project {
  projectStack: { projectId: string; stackId: string; stack: Stack }[]
}
