import { InlineScript } from "@/components/inline-script"

type RevealEncodedTextScriptProps = {
  id: string
  textB64: string
}

// Blocking inline script that decodes the base64 text and writes it into the
// element *before* first paint (Next.js "prevent flash before hydration").
// The real value is therefore never present as plaintext in the served HTML,
// yet there is no flash from the client-only decode swap.
export function RevealEncodedTextScript({
  id,
  textB64,
}: RevealEncodedTextScriptProps) {
  return (
    <InlineScript
      html={`(${revealEncodedText.toString()})(${JSON.stringify(id)},${JSON.stringify(textB64)})`}
    />
  )
}

// Serialized via `.toString()` into the pre-hydration script, so it must stay
// self-contained: globals and arguments only, no module-scope references.
function revealEncodedText(id: string, textB64: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.textContent = atob(textB64)
}
