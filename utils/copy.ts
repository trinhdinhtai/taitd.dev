export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function copyToClipboardWithEvent(value: string) {
  return copyText(value)
}
