'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Target, 
  Users, 
  BookOpen, 
  Download, 
  Award, 
  ShieldCheck,
  TrendingUp,
  Globe
} from "lucide-react"

const AlumniPortalPage = () => {
  return (
    <div className="bg-appBg min-h-screen font-sans">
      
      {/* Hero / Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Alumni Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Maintaining a lifelong connection between Government Engineering College 
            West Champaran and its global graduate community.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: About & Mission (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primaryLight rounded-lg">
                  <Globe className="text-primary" size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">About the Portal</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                The Alumni Portal of GEC West Champaran is a dedicated platform created to 
                maintain a lifelong connection between the institution and its alumni. 
                The portal aims to bring together alumni, students, and the institute to 
                foster professional engagement, mentorship, and institutional development.
              </p>
            </section>

            {/* Mission & Objectives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="rounded-xl border-gray-200 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Target className="text-primary" size={20} />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-sm leading-relaxed">
                  To foster strong bonds between alumni and students, keeping the 
                  community informed and creating a network that enables graduates 
                  to remain engaged with their alma mater.
                </CardContent>
              </Card>

              <Card className="rounded-xl border-gray-200 shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <TrendingUp className="text-primary" size={20} />
                    Our Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Promote interaction among alumni members globally.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Encourage high-impact mentorship for current students.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      Support research and institutional infrastructure.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Outreach Section */}
            <section className="bg-primaryLight/30 p-8 rounded-2xl border border-primaryLight">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="text-primary" size={22} />
                Alumni Outreach
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Building bridges between past and present students by encouraging 
                participation in reunions, mentoring programs, and knowledge-sharing 
                initiatives. Joining the alumni association provides a unique 
                opportunity to reconnect and give back.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <BadgeItem label="Mentoring" />
                <BadgeItem label="Workshops" />
                <BadgeItem label="Reunions" />
                <BadgeItem label="Placement Support" />
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            
            {/* Advisory Board Card */}
            <Card className="rounded-xl border-gray-200 shadow-sm overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ShieldCheck className="text-primary" size={20} />
                  Advisory Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BoardMember name="Prof. A. Kumar" role="Patron" />
                  <Separator className="bg-gray-100" />
                  <BoardMember name="Dr. S. Singh" role="President" />
                  <Separator className="bg-gray-100" />
                  <BoardMember name="Mr. R. Verma" role="Secretary" />
                  <Separator className="bg-gray-100" />
                  <BoardMember name="Ms. P. Sharma" role="Treasurer" />
                </div>
              </CardContent>
            </Card>

            {/* Reports & Archives Card */}
            <Card className="rounded-xl border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="text-primary" size={20} />
                  Reports & Archives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <ArchiveLink label="Annual Reports" />
                  <ArchiveLink label="Articles of Association" />
                  <ArchiveLink label="Quarterly Newsletters" />
                </ul>
                <Button className="w-full bg-primary hover:bg-primaryDark text-white flex items-center justify-center gap-2 py-6 rounded-md">
                  <Download size={16} />
                  Download Complete Archive
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * Helper Components
 */

function BadgeItem({ label }: { label: string }) {
  return (
    <span className="bg-white border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
      {label}
    </span>
  )
}

function BoardMember({ name, role }: { name: string, role: string }) {
  return (
    <div className="flex justify-between items-center group">
      <div>
        <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
      <Award size={16} className="text-gray-300 group-hover:text-primaryLight transition-colors" />
    </div>
  )
}

function ArchiveLink({ label }: { label: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer transition-colors group">
      <Download size={14} className="text-gray-400 group-hover:text-primary" />
      {label}
    </li>
  )
}

export default AlumniPortalPage