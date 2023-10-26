"use client"

import { Sandpack } from "@codesandbox/sandpack-react"

interface CodePlaygroundProps {
  files: {
    [fileName: string]: string
  }
}

export default function CodePlayground({ files }: CodePlaygroundProps) {
  return (
    <Sandpack
      files={files}
      theme="light"
      template="vanilla"
      options={{ showConsole: true, showConsoleButton: true }}
    />
  )
}
