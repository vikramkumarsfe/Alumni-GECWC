'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import logoImage from '@/public/images/logo.jpeg'

const menus = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/alumni'
  },
  {
    label: 'Contact',
    href: '/contact'
  },
  {
    label: 'Login',
    href: '/login'
  },
]

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const blacklists = ['/login', '/signup']
  const isBlacklist = blacklists.includes(pathname)

  if (isBlacklist) {
    return <>{children}</>
  }

  return (
    <div>

      <nav className="px-[10%] bg-white shadow-lg sticky top-0 z-50 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">

          <Image
            src={logoImage}
            alt="logoImage"
            className="w-12 h-12 object-contain"
          />

          <h1 className="text-2xl font-semibold text-gray-900 whitespace-nowrap">
            Alumni Portal
          </h1>

        </div>

        <div className="flex gap-10 items-center">
          {
            menus.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={pathname === item.href ? 'text-violet-600 font-medium' : 'text-black'}
              >
                {item.label}
              </Link>
            ))}

          <Link href="/signup" className="bg-violet-600 px-6 py-2 rounded text-white">
            Signup
          </Link>
        </div>
      </nav>


      <section className="px-[10%] py-16">
        {children}
      </section>


      <footer className="bg-slate-50 border-t border-gray-200 mt-24">


        <div className="px-[10%] py-16 grid grid-cols-1 md:grid-cols-4 gap-12">


          <div className="space-y-4 flex justify-center item-center ">

            <div className="flex items-start gap-6">

              <div className="w-12 h-12 flex items-center justify-center   shrink-0">
                <Image
                  src={logoImage}
                  alt="logoImage"
                />
              </div>



              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Alumni Portal
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Empowering alumni and students through lifelong connections,
                  mentorship, career growth, and institutional engagement.
                </p>
              </div>

            </div>

          </div>

          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
              University
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link className="hover:text-violet-600 transition" href="/about">About Us</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/alumni">Alumni Network</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/events">Events</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/mentorship">Mentorship</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link className="hover:text-violet-600 transition" href="/jobs">Jobs & Internships</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/faqs">FAQs</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/guidelines">Guidelines</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/notices">Notices</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-5">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link className="hover:text-violet-600 transition" href="/contact">Contact Us</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/help">Help Desk</Link></li>
              <li><Link className="hover:text-violet-600 transition" href="/grievance">Grievance Redressal</Link></li>
            </ul>
          </div>

        </div>

        
        <div className="border-t border-gray-200"></div>

        
        <div className="px-[10%] py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © 2026 Alumni Data Management System. All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link className="hover:text-violet-600 transition" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-violet-600 transition" href="/terms">Terms of Service</Link>
            <Link className="hover:text-violet-600 transition" href="/sitemap">Sitemap</Link>
          </div>
        </div>

      </footer>
    </div>
  )
}

export default MainLayout
