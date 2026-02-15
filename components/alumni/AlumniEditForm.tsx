"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { message } from "antd"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProfileImageUpload from "./ProfileImageUpload"

// 1. Define Validation Schema
const profileSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters."),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number."),
  bio: z.string().max(160, "Bio must be under 160 characters.").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function AlumniEditForm() {
  const [isLoading, setIsLoading] = useState(false)

  // 2. Initialize Form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: "Vikram Kumar",
      mobile: "9876543210",
      bio: "Software Engineer passionate about scalable systems.",
    },
  })

  // 3. Handle Submit
  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      // Simulate API Call
      console.log("Form Data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      message.success("Profile updated successfully!")
    } catch (error) {
      message.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-lg md:border md:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Profile Image Section */}
            <div className="flex justify-center pb-4">
              <ProfileImageUpload
                image="https://i.pravatar.cc/300?img=10"
                name={form.getValues("fullname")}
                onChange={(file) => console.log("New File:", file)}
              />
            </div>

            <div className="grid gap-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}