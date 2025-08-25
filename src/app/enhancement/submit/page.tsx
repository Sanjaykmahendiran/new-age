"use client"

import React, { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SubmitEnhancement() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

  const categories = [
    "UI/UX Improvements",
    "Reporting & Analytics",
    "Operations Management",
    "API & Integrations",
    "Mobile Experience",
    "Performance",
    "Security",
    "Documentation",
  ]

  const priorities = [
    { value: "low", label: "Low", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-orange-600" },
    { value: "critical", label: "Critical", color: "text-red-600" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || [])
    setFiles([...files, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!title || !description || !category || !priority) {
      alert("Please fill in all required fields")
      return
    }

    console.log("Form submitted:", { title, description, category, priority, files })
    alert("Enhancement request submitted successfully!")

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setPriority("")
    setFiles([])
  }

  const getPriorityLabel = () => {
    const selected = priorities.find(p => p.value === priority)
    return selected ? selected.label : "Select priority"
  }

  const getPriorityColor = () => {
    const selected = priorities.find(p => p.value === priority)
    return selected ? selected.color : "text-gray-500"
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Submit Enhancement</h1>
          <p className="text-sm text-gray-600 mt-1">Share your ideas to improve FreightFlow</p>
        </div>
      </header>
      <div className="flex-1 px-6 py-2">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="p-6 space-y-6">

            {/* Feature Title */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Feature Title *</Label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, descriptive title for your enhancement"
                className="h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-400 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Category Dropdown */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Category *</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="h-10 w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={category ? "text-gray-900" : "text-gray-400"}>
                      {category || "Select category"}
                    </span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className="cursor-pointer select-none py-2 px-3 text-sm text-gray-600 hover:bg-gray-100"
                          onClick={() => {
                            setCategory(cat)
                            setShowCategoryDropdown(false)
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Priority Dropdown */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Priority *</Label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
                    className="h-10 w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={priority ? getPriorityColor() : "text-gray-400"}>
                      {getPriorityLabel()}
                    </span>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showPriorityDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {priorities.map((p) => (
                        <div
                          key={p.value}
                          className="cursor-pointer select-none py-2 px-3 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setPriority(p.value)
                            setShowPriorityDropdown(false)
                          }}
                        >
                          <span className={p.color}>{p.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Detailed Description *</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your enhancement idea in detail..."
                className="min-h-32 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-400 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Screenshots / Mockups</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">Upload screenshots, mockups, or reference images</p>
                <p className="text-xs text-gray-400 mb-3">PNG, JPG, GIF up to 10MB each</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="border border-gray-300 bg-white hover:bg-gray-50 rounded-md h-10 px-4 text-sm font-medium text-gray-400"
                >
                  Choose Files
                </button>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Uploaded Files</Label>
                  <div className="space-y-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Upload className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-gray-600 rounded-md h-8 w-8 flex items-center justify-center"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Guidelines */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Enhancement Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific about the problem you're trying to solve</li>
                <li>• Explain how this enhancement would benefit other users</li>
                <li>• Include mockups or examples if possible</li>
                <li>• Check existing suggestions to avoid duplicates</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 ">
              <Button onClick={handleSubmit} className="bg-primary text-white h-10 px-6">
                Submit Enhancement Request
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
