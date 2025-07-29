"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  id: string
  accept: string
  maxSize: number
  note?: string
}

export function FileUpload({ id, accept, maxSize, note }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClick}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Choose File
        </Button>
        <span className="text-sm text-gray-500">{fileName || "No file chosen"}</span>
        <input ref={fileInputRef} id={id} type="file" accept={accept} className="hidden" onChange={handleFileChange} />
      </div>
      {note && <p className="text-xs text-gray-500 whitespace-pre-line">{note}</p>}
    </div>
  )
}
