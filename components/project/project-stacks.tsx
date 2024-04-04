import { STACKS } from "@/constants/stack"
import { ProjectStack, Stack } from "@prisma/client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StackProps {
  projectStack: (ProjectStack & { stack: Stack })[]
}

export default function ProjectStacks({ projectStack }: Readonly<StackProps>) {
  return (
    <div className="flex items-center gap-3">
      {projectStack.map(({ stack }) => (
        <TooltipProvider key={stack.id} delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>{STACKS[stack.name]}</TooltipTrigger>
            <TooltipContent>{stack.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
