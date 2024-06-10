import { Editor } from "@tiptap/react"
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EditorToolbarProps {
  editor: Editor
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex flex-row items-center gap-0.5 px-1.5">
      {[
        {
          name: "bold",
          icon: <BoldIcon className="size-4" />,
        },
        {
          name: "strike",
          icon: <StrikethroughIcon className="size-4" />,
        },
        {
          name: "italic",
          icon: <ItalicIcon className="size-4" />,
        },
      ].map((item) => (
        <Button
          key={item.name}
          aria-label={`Toggle ${item.name}`}
          variant="ghost"
          size="icon"
          className={cn(
            "size-7",
            editor.isActive(item.name) && "bg-accent text-accent-foreground"
          )}
          disabled={!editor.can().toggleMark(item.name) || !editor.isEditable}
          onClick={() => editor.commands.toggleMark(item.name)}
          type="button"
        >
          {item.icon}
        </Button>
      ))}
    </div>
  )
}
