'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import logoImage from '@/public/images/logo.jpeg'
import { Button } from "@/components/ui/button";
import { SessionProvider } from 'next-auth/react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from './AppSidebar';
import DashboardHeader from './DashboardHeader';

const menus = [
  { label: 'Home', href: '/' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
]

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  
  const blacklists = ['/login', '/signup']
  const isBlacklist = blacklists.includes(pathname)

  // --- LOGIC: Check if we are in the Alumni System ---
  const isAlumniSystem = pathname.startsWith('/alumni')

  if (isBlacklist) {
    return <>{children}</>
  }

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
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border shadow-sm">
                <Image src={logoImage} alt="Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground sm:inline-block">
                Alumni<span className="text-violet-600">Portal</span>
              </span>
            </Link>

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
              <Button asChild className="bg-violet-600 hover:bg-violet-700 shadow-md">
                <Link href="/signup">Signup</Link>
              </Button>
            </div>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t bg-slate-50/50">
          {/* ... existing footer code ... */}
          <div className="container px-4 py-12 md:px-8">
             <div className="flex flex-col items-center justify-between gap-4 md:row">
               <p className="text-xs text-muted-foreground">© 2026 Alumni Data Management.</p>
             </div>
          </div>
        </footer>
      </div>
    </SessionProvider>
  )
}

export default MainLayout