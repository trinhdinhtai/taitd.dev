"use client"

import { CopyButton as CopyButtonPrimitive } from "./ui/copy-button"
import type { CopyButtonProps } from "./ui/copy-button"

export function CopyButton({ size = "icon-sm", ...props }: CopyButtonProps) {
  return <CopyButtonPrimitive variant="secondary" size={size} {...props} />
}
