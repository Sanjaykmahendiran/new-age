"use client"

import { useState } from "react"
import {
  Upload,
  X,
  AlertCircle
} from "lucide-react"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  "API Integration",
  "Platform Issues",
  "Billing & Account",
  "Documentation",
  "Feature Request",
  "Technical Support",
]

const priorities = ["Low", "Medium", "High"]

export default function SubmitTicket() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }
    if (name === "subject" && (!value.trim() || value.length < 5))
      newErrors.subject = "Subject must be at least 5 characters"
    else delete newErrors.subject

    if (name === "category" && !value)
      newErrors.category = "Category is required"
    else delete newErrors.category

    if (name === "priority" && !value)
      newErrors.priority = "Priority is required"
    else delete newErrors.priority

    if (name === "description" && (!value.trim() || value.length < 10))
      newErrors.description = "Description must be at least 10 characters"
    else delete newErrors.description

    setErrors(newErrors)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files || [])
    const valid = uploaded.filter(file => {
      const sizeLimit = 10 * 1024 * 1024
      const allowedTypes = ["image/", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument"]
      if (file.size > sizeLimit || !allowedTypes.some(t => file.type.startsWith(t))) {
        alert(`${file.name} is too large or unsupported.`)
        return false
      }
      return true
    })
    setFiles(prev => [...prev, ...valid])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    const errs: Record<string, string> = {}
    if (!formData.subject.trim() || formData.subject.length < 5)
      errs.subject = "Subject must be at least 5 characters"
    if (!formData.category) errs.category = "Category is required"
    if (!formData.priority) errs.priority = "Priority is required"
    if (!formData.description.trim() || formData.description.length < 10)
      errs.description = "Description must be at least 10 characters"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert("Ticket submitted successfully!")
      setFormData({ subject: "", category: "", priority: "", description: "" })
      setFiles([])
    } catch {
      alert("Failed to submit ticket.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="flex items-center justify-between px-6 py-4 ">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Submit a Ticket</h1>
          <p className="text-sm text-muted-foreground">
            Reach out to our support team for help or questions
          </p>
        </div>
        <Button className="primaty" onClick={() => router.push("/support/my-tickets")}>
          My Tickets
        </Button>
      </header>

      <main className="flex-1 px-6 md:px- py-2 w-full">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl p-6">

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject, Category, Priority */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Subject */}
                <div className="flex flex-col space-y-4">
                  <Label htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="e.g. API error on submission"
                    className={`text-gray-400 placeholder:text-gray-400 ${errors.subject ? "border-red-500" : ""}`}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="flex flex-col space-y-4">
                  <Label>
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => handleInputChange("category", v)}
                  >
                    <SelectTrigger
                      className={`text-gray-400 placeholder:text-gray-400 ${errors.category ? "border-red-500" : "w-full"}`}
                    >
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div className="flex flex-col space-y-4">
                  <Label>
                    Priority <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(v) => handleInputChange("priority", v)}
                  >
                    <SelectTrigger
                      className={`text-gray-400 placeholder:text-gray-400 ${errors.priority ? "border-red-500" : "w-full"}`}
                    >
                      <SelectValue placeholder="Choose priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((p) => (
                        <SelectItem key={p} value={p}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${p === "High"
                                  ? "bg-red-500"
                                  : p === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                            />
                            {p}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.priority && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.priority}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <Label htmlFor="description" className="font-medium text-sm">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-[100px] resize-none text-gray-400 placeholder:text-gray-400 ${errors.description ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  placeholder="Describe your issue with steps to reproduce..."
                  minLength={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {errors.description ? (
                    <p className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  ) : (
                    <span className="text-xs text-gray-400">Minimum 10 characters</span>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-xl p-6 text-center bg-white hover:bg-gray-100 transition-colors">
                  <Upload className="mx-auto w-6 h-6 text-gray-400" />
                  <p className="text-sm mt-2 text-gray-400">Drag & drop or click to upload files</p>
                  <Input
                    type="file"
                    multiple
                    id="file-upload"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 text-gray-400"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Choose Files
                  </Button>
                </div>

                {files.length > 0 && (
                  <div className="space-y-4">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2"
                      >
                        <div className="truncate text-sm text-gray-400">{file.name}</div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(idx)}>
                          <X className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-3 py-1 text-sm text-white bg-[#00d458] hover:bg-[#00b94c]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  )
}
