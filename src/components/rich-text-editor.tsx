"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Undo,
  Redo,
  Link2,
  ImageIcon,
  Printer,
  Eye,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface RichTextEditorProps {
  id: string
  initialValue?: string
}

export function RichTextEditor({ id, initialValue = "" }: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue)
  const [wordCount, setWordCount] = useState(0)

  return (
    <div className="border rounded-md">
      <div className="bg-gray-50 border-b p-2">
        <div className="flex items-center gap-1 text-sm text-gray-700 mb-2">
          <span>My Favorites</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>File</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Edit</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>View</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Insert</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Format</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Tools</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Table</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>Help</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <select className="h-8 px-2 border rounded text-sm">
            <option>Paragraph</option>
          </select>

          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <AlignRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <AlignJustify className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center border rounded">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="h-8 px-2 border rounded">
            <Link2 className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-2 border rounded">
            <ImageIcon className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-2 border rounded">
            <Printer className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-2 border rounded">
            <Eye className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8 px-2 border rounded">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <textarea
        id={id}
        className="w-full p-3 min-h-[200px] resize-none focus:outline-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length)
        }}
      />

      <div className="flex justify-end items-center p-2 text-xs text-gray-500 border-t">
        <span>{wordCount} WORDS. POWERED BY new-age</span>
      </div>
    </div>
  )
}
