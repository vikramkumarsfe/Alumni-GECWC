'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import logoImage from '@/public/images/logo.jpeg'
import { Button } from "@/components/ui/button";
import { SessionProvider, useSession } from 'next-auth/react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from './AppSidebar';
import DashboardHeader from './DashboardHeader';
import AdminAppSidebar from './adminAppSidebar';
import AdminDashboardHeader from './adminDashboardHeader';
import { Separator } from "@/components/ui/separator"
import { Typography } from "antd"
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
import { MailOutlined, PhoneOutlined, LinkedinOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import AuthSection from './authSection';
import Logo from './shared/Logo';

const { Text, Title } = Typography

const menus = [
  { label: 'Home', href: '/' },
  { label: 'Alumni', href: '/info' },
  { label: 'Contact', href: '/contact' },
]

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const blacklists = ['/login', '/signup']
  const isBlacklist = blacklists.includes(pathname)

  // --- LOGIC: Check for Admin or Alumni System ---
  const isAlumniSystem = pathname.startsWith('/alumni')
  const isAdminSystem = pathname.startsWith('/admin')

  if (isBlacklist) {
    return <>{children}</>
  }

  // --- RENDER: ADMIN DASHBOARD (Matches Alumni structure) ---
  if (isAdminSystem) {
    return (
      <SessionProvider>
        <SidebarProvider>
          {/* You can use the same Sidebar or a custom AdminSidebar here */}
          <AdminAppSidebar /> 
          <SidebarInset className="flex flex-col bg-zinc-50/50">
            <AdminDashboardHeader />
            <main className="flex-1 p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- RENDER: ALUMNI SYSTEM ---
  if (isAlumniSystem) {
    return (
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex flex-col bg-slate-50/50">
            <DashboardHeader />
            <main className="flex-1">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- RENDER: STANDARD PUBLIC LAYOUT ---
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-20 items-center justify-between px-4 md:px-8">
            <Logo />

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {menus.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? 'text-violet-600' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <AuthSection />
            </div>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>

<footer className="bg-[#fafaf9] border-t border-stone-200 text-stone-600">
      <div className="container mx-auto px-6 pb-4  pt-8 md:px-12">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          {/* Branding - Spans more columns for a modern look */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <Title level={4} className="!text-stone-800 !font-semibold !mb-2 tracking-tight">
                Alumni<span className="text-stone-400 font-light">-GECWC</span>
              </Title>
              <Text className="text-stone-500 max-w-xs block leading-relaxed">
                A natural bridge between our past and your future. Nurturing a professional ecosystem for every graduate.
              </Text>
            </div>
            
            <div className="flex gap-4 text-stone-400">
              <TwitterOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
              <InstagramOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
              <LinkedinOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-5">
            <h6 className="text-xs font-bold uppercase tracking-widest text-stone-400">Network</h6>
            <nav className="flex flex-col gap-3">
              <Link href="/alumni/directory" className="hover:text-stone-900 transition-colors">Directory</Link>
              <Link href="/alumni/events" className="hover:text-stone-900 transition-colors">Events</Link>
              <Link href="/alumni/jobs" className="hover:text-stone-900 transition-colors">Opportunities</Link>
            </nav>
          </div>

          <div className="md:col-span-2 space-y-5">
            <h6 className="text-xs font-bold uppercase tracking-widest text-stone-400">Legal</h6>
            <nav className="flex flex-col gap-3">
              <Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-stone-900 transition-colors">Terms</Link>
              <Link href="/help" className="hover:text-stone-900 transition-colors">Support</Link>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h6 className="text-xs font-bold uppercase tracking-widest text-stone-400">Connect</h6>
            <div className="space-y-3">
              <a href="mailto:support@gecwc.edu" className="flex items-center gap-2 hover:text-stone-900 transition-colors">
                <MailOutlined className="text-stone-300" />
                <span>alumni@gecwc.ac.in</span>
              </a>
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-stone-300" />
                <span>+91 6254243155</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mt-8 mb-2 bg-stone-200/60" />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Text className="text-stone-400 text-xs">
            © {new Date().getFullYear()} GECWC Alumni Portal. Handcrafted for our community.
          </Text>
        </div>
      </div>
    </footer>
  </div>
    </SessionProvider>
  )
}

export default MainLayout