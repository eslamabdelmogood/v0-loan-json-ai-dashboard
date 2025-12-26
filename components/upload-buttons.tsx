"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { mockLoanData } from "@/lib/mock-data"
import { toast } from "sonner"

interface UploadButtonsProps {
  onDataLoaded: (data: any) => void
}

export function UploadButtons({ onDataLoaded }: UploadButtonsProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setStatus({ type: null, message: "" })

    try {
      const content = await file.text()

      const response = await fetch("/api/convert-loan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          fileName: file.name,
          fileType: file.type,
        }),
      })

      const result = await response.json()

      if (result.success) {
        onDataLoaded(result.data)
        setStatus({ type: "success", message: result.message })
        toast.success(result.message)
      } else {
        throw new Error(result.error || "Invalid or unsupported loan document")
      }
    } catch (error: any) {
      setStatus({ type: "error", message: error.message })
      toast.error(error.message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const loadSample = () => {
    onDataLoaded(mockLoanData)
    setStatus({ type: "success", message: "Sample loan loaded successfully" })
    toast.success("Sample loan loaded")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".json,.pdf,.docx,.txt"
        />
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-primary/5 border-primary/20 hover:bg-primary/10"
        >
          {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          Upload Loan File
        </Button>
        <Button variant="secondary" onClick={loadSample} disabled={isUploading}>
          <FileText className="mr-2 h-4 w-4" />
          Load Sample Loan
        </Button>
      </div>

      {status.type && (
        <div
          className={`flex items-center gap-2 text-sm font-medium p-3 rounded-lg border ${
            status.type === "success"
              ? "bg-success/10 text-success border-success/20"
              : "bg-destructive/10 text-destructive border-destructive/20"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {status.message}
        </div>
      )}
    </div>
  )
}
