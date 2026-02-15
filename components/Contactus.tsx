'use client'

import React from "react"
import Image from "next/image"
import logoImage from '@/public/images/logo.jpeg'

// Shadcn UI Components (Assuming standard install paths)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

const ContactPage = () => {
  return (
    <div className="bg-appBg font-sans">
      
      {/* Header Section: Following Page Title Hierarchy */}
      <section className="text-center max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have questions or need assistance? Reach out to us and our team will get back to you shortly.
        </p>
      </section>

      {/* Main Content: Global Container Pattern */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24 space-y-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Sidebar */}
          <Card className="lg:col-span-1 rounded-xl shadow-sm border-gray-200 h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
              <CardDescription>Official correspondence details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col items-center text-center p-6 bg-primaryLight rounded-xl">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm mb-4">
                  <Image
                    src={logoImage}
                    alt="GEC West Champaran Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 leading-tight">
                  Government Engineering College West Champaran
                </h3>
              </div>

              <div className="space-y-6">
                <ContactDetail 
                  icon={<MapPin className="text-primary" size={20} />} 
                  title="Address"
                  content="Railway Station, Opposite Kumarbagh, Kumarbagh, Bihar 845450"
                />
                <ContactDetail 
                  icon={<Phone className="text-primary" size={20} />} 
                  title="Phone"
                  content="+91 6254243155"
                />
                <ContactDetail 
                  icon={<Mail className="text-primary" size={20} />} 
                  title="Email"
                  content="alumni@gecwc.ac.in"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="lg:col-span-2 rounded-xl shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we will respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your Name" 
                    className="focus:ring-primary h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Query</SelectItem>
                      <SelectItem value="registration">Alumni Registration</SelectItem>
                      <SelectItem value="mentorship">Mentorship</SelectItem>
                      <SelectItem value="jobs">Jobs & Internships</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your Email" 
                    className="focus:ring-primary h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select Your Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message">Message (Student Queries)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={10}
                    className="focus:ring-primary resize-none"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <Button 
                    className="w-full md:w-auto bg-primary hover:bg-primaryDark text-white px-12 py-6 rounded-md text-lg transition-all shadow-md"
                  >
                    Send Message
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}

/**
 * Helper component for Contact Info entries
 */
function ContactDetail({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">{title}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  )
}

export default ContactPage