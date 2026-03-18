'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet"
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import DashboardHeader from './DashboardHeader';
import { Separator } from "@/components/ui/separator"
import { Typography, Breadcrumb } from "antd" // Added Breadcrumb here
import { MailOutlined, PhoneOutlined, LinkedinOutlined, TwitterOutlined, InstagramOutlined, HomeOutlined } from "@ant-design/icons"
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
  const blacklists = ['/login', '/signup']
  const isBlacklist = blacklists.includes(pathname)

  const isAlumniSystem = pathname.startsWith('/alumni')
  const isAdminSystem = pathname.startsWith('/admin')
  const isStudentSystem = pathname.startsWith('/student')

  // Helper to generate Breadcrumb items from path
  const generateBreadcrumbs = () => {
    const pathSnippets = pathname.split('/').filter((i) => i);
    
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const label = pathSnippets[index].charAt(0).toUpperCase() + pathSnippets[index].slice(1);
      
      return {
        key: url,
        title: <Link href={url}>{label.replace(/-/g, ' ')}</Link>,
      };
    });

    return [
      {
        path: '/',
        title: <HomeOutlined />,
      },
      ...extraBreadcrumbItems,
    ];
  };

  if (isBlacklist) {
    return <>{children}</>
  }

  // Common Wrapper for Dashboard Content to include Breadcrumbs
  const DashboardWrapper = ({ children, header }: { children: React.ReactNode, header: React.ReactNode }) => (
    <SidebarInset className="flex flex-col min-h-screen bg-slate-50">
      {header}
      <div className="px-6 py-4 bg-slate-50">
        <Breadcrumb items={generateBreadcrumbs()} className="mb-4" />
      </div>
      <main className="flex-1 px-6 pb-6 bg-slate-50">
        {children}
      </main>
    </SidebarInset>
  )

  if (isStudentSystem) {
    return (
      <SessionProvider>
        <SidebarProvider>
          <StudentAppSidebar />
          <DashboardWrapper header={<StudentDashboardHeader />}>
            {children}
          </DashboardWrapper>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  if (isAdminSystem) {
    return (
      <SessionProvider>
        <SidebarProvider>
          <AdminAppSidebar />
          <DashboardWrapper header={<AdminDashboardHeader />}>
            {children}
          </DashboardWrapper>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  if (isAlumniSystem) {
    return (
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <DashboardWrapper header={<DashboardHeader />}>
            {children}
          </DashboardWrapper>
        </SidebarProvider>
      </SessionProvider>
    )
  }

  // --- RENDER: STANDARD PUBLIC LAYOUT ---
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        {/* ... existing header and footer code remains the same ... */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-20 items-center justify-between px-6 md:px-8">
            <Logo />
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {menus.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-violet-600" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <AuthSection />
            </div>
          {/* Mobile Hamburger */}

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
                    <div className="pt-4">
                      <MobileAuthSection />
                    </div>
                    {menus.map((item) => (
                       <Link
                          key={item.href}
                          href={item.href}
                          className={`text-base font-medium ${
                            pathname === item.href
                            ? "text-violet-600"
                            : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </Link>
                    ))}
                    <div >
                      <MobileLoginSignup />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </header>

        <main className="flex-1">
          {/* Optional: Add breadcrumbs to public pages too if desired */}
          {children}
        </main>

        <footer className="bg-[#fafaf9] border-t border-stone-200 text-stone-600">
          <div className="container mx-auto px-6 pb-4  pt-8 md:px-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

            
              {/* Branding - Spans more columns for a modern look */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <Logo/>
                  <Text className="text-stone-500 max-w-xs block leading-relaxed">
                    A natural bridge between our past and your future. Nurturing a professional ecosystem for every graduate.
                  </Text>
                </div>

              
                <div className="flex gap-4 text-stone-400">
                  <a href='https://x.com/gecwc' target="_blank">
                    <TwitterOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/gecwc19/" target='_blank'>
                    <InstagramOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/school/government-engineering-college-west-champaran/posts/?feedView=all" target="_blank">
                    <LinkedinOutlined className="hover:text-stone-600 cursor-pointer transition-colors" />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="md:col-span-2 space-y-5">
                <h6 className="text-large font-bold uppercase tracking-widest text-black">Network</h6>
                <nav className="flex flex-col gap-3">
                  <Link href="/alumni/directory" className="hover:text-stone-900 transition-colors">Directory</Link>
                  <Link href="/alumni/events" className="hover:text-stone-900 transition-colors">Events</Link>
                  <Link href="/jobs" className="hover:text-stone-900 transition-colors">Opportunities</Link>
                </nav>
              </div>

              <div className="md:col-span-2 space-y-5">
                <h6 className="text-large font-bold uppercase tracking-widest text-black">Legal</h6>
                <nav className="flex flex-col gap-3">
                  <Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy</Link>
                  <Link href="/terms" className="hover:text-stone-900 transition-colors">Terms</Link>
                  <Link href="/help" className="hover:text-stone-900 transition-colors">Support</Link>
                </nav>
              </div>

              {/* Contact Details */}

              <div className="md:col-span-3 space-y-3">
                <h6 className="text-large font-bold uppercase tracking-widest text-black">Connect</h6>
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