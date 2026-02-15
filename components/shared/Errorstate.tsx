'use client'

import React from 'react'
import Link from 'next/link'
import { AlertCircle, RefreshCcw, Home, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error & { digest?: string }
  reset?: () => void
}

export default function ErrorState({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.",
  error,
  reset
}: ErrorStateProps) {
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-appBg px-6">
      <Card className="max-w-md w-full border-gray-200 shadow-lg rounded-2xl overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 bg-red-500" />
        
        <CardContent className="pt-10 pb-8 px-8 text-center">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-red-50 rounded-full">
              <AlertCircle size={48} className="text-red-500" />
            </div>
          </div>

          {/* Typography Hierarchy */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {description}
          </p>

          {/* Technical Detail (Optional/Muted) */}
          {error?.digest && (
            <div className="mb-8 p-3 bg-gray-50 rounded-md border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                Error Digest
              </p>
              <code className="text-xs text-gray-500 break-all">
                {error.digest}
              </code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {reset && (
              <Button 
                onClick={() => reset()}
                className="w-full bg-primary hover:bg-primaryDark text-white h-11 rounded-md transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                Try Again
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                asChild
                className="border-gray-300 text-gray-700 hover:bg-gray-50 h-11"
              >
                <Link href="/">
                  <Home size={18} className="mr-2" />
                  Home
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-gray-500 hover:text-primary h-11"
              >
                <ChevronLeft size={18} className="mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Support Footer */}
        <div className="bg-gray-50 border-t border-gray-100 py-4 px-8 text-center">
          <p className="text-xs text-gray-500">
            Need help? <Link href="/contact" className="text-primary font-medium hover:underline">Contact Support</Link>
          </p>
        </div>
      </Card>
    </div>
  )
}