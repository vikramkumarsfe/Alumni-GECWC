"use client"

import React, { useState, useEffect, useRef } from "react"
import { Pencil } from "lucide-react" // Lucide icons come with shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { message } from "antd" // Using AntD for lightweight notifications

interface ProfileImageUploadProps {
  image?: string
  onChange: (file: File) => void
  name?: string
}

export default function ProfileImageUpload({ 
  image, 
  onChange, 
  name = "User" 
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState(image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cleanup the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    
    if (!file) return

    // Simple validation (AntD style feedback)
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onChange(file)
    message.success("Image selected")
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
          <AvatarImage src={preview} alt={name} className="object-cover" />
          <AvatarFallback className="text-2xl bg-muted">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Modern Hover Overlay */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          type="button"
        >
          <Pencil className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Profile Picture
        </Button>
        <p className="text-xs text-muted-foreground">
          JPG, GIF or PNG. Max size of 2MB.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  )
}