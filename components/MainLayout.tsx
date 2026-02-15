'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import logoImage from '@/public/images/logo.jpeg'

// Shadcn & Icon Imports
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink 
} from "lucide-react";
import { SessionProvider } from 'next-auth/react';

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

  if (isBlacklist) {
    return <>{children}</>
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
        {/* --- HEADER --- */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-20 items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border shadow-sm">
                <Image
                  src={logoImage}
                  alt="Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground sm:inline-block">
                Alumni<span className="text-primary text-violet-600">Portal</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {menus.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href 
                        ? 'text-violet-600' 
                        : 'text-muted-foreground'
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
            
            {/* Mobile Placeholder (You could add a shadcn Sheet here later) */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">Menu</Button>
            </div>
          </nav>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          {children}
        </main>

        {/* --- FOOTER --- */}
        <footer className="border-t bg-slate-50/50">
          <div className="container px-4 py-12 md:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
              
              {/* Branding Column */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Image src={logoImage} alt="logo" width={32} height={32} className="rounded" />
                  <h2 className="text-lg font-bold">Alumni Portal</h2>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                  Empowering connections and fostering lifelong mentorship between our 
                  distinguished alumni and the next generation of leaders.
                </p>
                <div className="flex gap-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Twitter className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Linkedin className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Mail className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Links Columns */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">University</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/about" className="hover:text-violet-600 transition-colors">About Us</Link></li>
                    <li><Link href="/alumni" className="hover:text-violet-600 transition-colors">Alumni Network</Link></li>
                    <li><Link href="/events" className="hover:text-violet-600 transition-colors">Events</Link></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/jobs" className="hover:text-violet-600 transition-colors">Jobs</Link></li>
                    <li><Link href="/faqs" className="hover:text-violet-600 transition-colors">FAQs</Link></li>
                    <li><Link href="/notices" className="hover:text-violet-600 transition-colors italic">Latest Notices</Link></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Support</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/contact" className="hover:text-violet-600 transition-colors">Contact</Link></li>
                    <li><Link href="/help" className="hover:text-violet-600 transition-colors">Help Desk</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-xs text-muted-foreground">
                © 2026 Alumni Data Management. Built with pride by the University Team.
              </p>
              <div className="flex gap-6 text-xs text-muted-foreground">
                <Link href="/privacy" className="hover:underline underline-offset-4">Privacy</Link>
                <Link href="/terms" className="hover:underline underline-offset-4">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SessionProvider>
  )
}

export default MainLayout