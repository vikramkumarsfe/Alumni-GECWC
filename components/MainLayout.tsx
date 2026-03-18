'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import DashboardHeader from './DashboardHeader';
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, Typography } from "antd"
import {
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  HomeOutlined
} from "@ant-design/icons"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import AuthSection from './authSection';
import Logo from './shared/Logo';
import { Button } from './ui/button';
import { DialogTitle } from './ui/dialog';
import { MobileAuthSection, MobileLoginSignup } from './mobileAuthSection';
import AdminAppSidebar from './public/adminAppSidebar';
import AdminDashboardHeader from './public/adminDashboardHeader';
import { AppSidebar } from './public/AppSidebar';
import StudentAppSidebar from './public/studentAppSidebar';
import StudentDashboardHeader from './public/studentDashboardHeader';

const { Text } = Typography

const menus = [
  { label: 'Home', href: '/' },
  { label: 'Alumni', href: '/info' },
  { label: 'Contact', href: '/contact' },
]

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const isBlacklist = ['/login', '/signup'].some(path =>
    pathname.startsWith(path)
  )

  const isAlumniSystem = pathname.startsWith('/alumni')
  const isAdminSystem = pathname.startsWith('/admin')
  const isStudentSystem = pathname.startsWith('/student')

  // ✅ Breadcrumb generator
  const generateBreadcrumbs = () => {
    const pathSnippets = pathname.split('/').filter(Boolean)

    const items = pathSnippets.map((_, index) => {
      const url = '/' + pathSnippets.slice(0, index + 1).join('/')
      const label = pathSnippets[index]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())

      return {
        key: url,
        title: <Link href={url}>{label}</Link>,
      }
    })

    return [
      {
        key: 'home',
        title: <Link href="/"><HomeOutlined /></Link>,
      },
      ...items,
    ]
  }

  if (isBlacklist) return <>{children}</>

  // --- STUDENT SYSTEM ---
  if (isStudentSystem) {
    return (
      <SessionProvider>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full overflow-hidden">
            <StudentAppSidebar />

            <SidebarInset className="flex flex-col min-h-screen flex-1 min-w-0 bg-slate-50">
              <StudentDashboardHeader />

              {/* Breadcrumb */}
              <div className="px-6 pt-4 bg-slate-50 border-b">
                <Breadcrumb items={generateBreadcrumbs()} />
              </div>

              <main className="flex-1 p-6 bg-slate-50 overflow-auto">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- ADMIN SYSTEM ---
  if (isAdminSystem) {
    return (
      <SessionProvider>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full overflow-hidden">
            <AdminAppSidebar />

            <SidebarInset className="flex flex-col flex-1 min-w-0 bg-zinc-50/50">
              <AdminDashboardHeader />

              {/* Breadcrumb */}
              <div className="px-6 pt-4 bg-slate-50 border-b">
                <Breadcrumb items={generateBreadcrumbs()} />
              </div>

              <main className="flex-1 p-6 bg-slate-50 overflow-auto">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- ALUMNI SYSTEM ---
  if (isAlumniSystem) {
    return (
      <SessionProvider>
        <SidebarProvider defaultOpen>
          <div className="flex min-h-screen w-full overflow-hidden">
            <AppSidebar />

            <SidebarInset className="flex flex-col flex-1 min-w-0 bg-slate-50/50">
              <DashboardHeader />

              {/* Breadcrumb */}
              <div className="px-6 pt-4 bg-slate-50 border-b">
                <Breadcrumb items={generateBreadcrumbs()} />
              </div>

              <main className="flex-1 bg-slate-50 overflow-auto p-6">
                {children}
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- PUBLIC LAYOUT ---
  return (
    <SessionProvider>
      <div className="flex min-h-screen w-full flex-col bg-background font-sans antialiased">

        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <nav className="mx-auto flex h-20 w-full items-center justify-between px-6 md:px-8">
            <Logo />

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {menus.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium ${
                      pathname === item.href
                        ? "text-violet-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <AuthSection />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={22} />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-[260px]">
                  <VisuallyHidden>
                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
                  </VisuallyHidden>

                  <div className="mt-8 flex flex-col gap-6 px-6">
                    <MobileAuthSection />
                    {menus.map((item) => (
                      <Link key={item.href} href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                    <MobileLoginSignup />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </header>

        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-[#fafaf9] border-t text-stone-600">
          <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-12 gap-10">

            <div className="md:col-span-5 space-y-4">
              <Logo />
              <Text className="text-stone-500 max-w-xs">
                A natural bridge between our past and your future.
              </Text>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h6 className="font-bold">Network</h6>
              <Link href="/alumni/directory">Directory</Link>
              <Link href="/alumni/events">Events</Link>
              <Link href="/jobs">Opportunities</Link>
            </div>

            <div className="md:col-span-2 space-y-3">
              <h6 className="font-bold">Legal</h6>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/help">Support</Link>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h6 className="font-bold">Connect</h6>
              <div className="flex gap-2 items-center">
                <MailOutlined /> alumni@gecwc.ac.in
              </div>
              <div className="flex gap-2 items-center">
                <PhoneOutlined /> +91 6254243155
              </div>
            </div>

          </div>

          <Separator />
          <div className="text-center text-xs py-3 text-stone-400">
            © {new Date().getFullYear()} GECWC Alumni Portal
          </div>
        </footer>

      </div>
    </SessionProvider>
  )
}

export default MainLayout