import { compile } from "tailwindcss"

const compiler = await compile('@import "tailwindcss" source(none);', {
  base: process.cwd(),
  loadStylesheet: async (id, base) => {
    const { readFile } = await import("node:fs/promises")
    const path = new URL(
      "./node_modules/tailwindcss/index.css",
      `file://${process.cwd()}/`
    )
    return { base, path: path.pathname, content: await readFile(path, "utf8") }
  },
})

console.log(compiler.build(["md:w-39.5", "md:w-[158px]"]))
