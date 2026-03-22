'use client'
import { FC } from 'react'
import { Users, MessageCircle, Calendar, LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import useSWR from 'swr'

interface Stat {
  label: string
  value: number | string
  icon: LucideIcon
}

const stats: Stat[] = [
  { label: 'Alumni Connections', value: 0, icon: Users },
  { label: 'Unread Messages', value: 0, icon: MessageCircle },
  { label: 'Upcoming Events', value: 0, icon: Calendar },
]

export default function StatCards() {
    const { data, error, isLoading } = useSWR('/api/alumni')
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <Card 
            key={s.label} 
            className="border border-slate-200 shadow-sm bg-white hover:border-slate-300 transition-colors duration-200"
          >
            <CardContent className="p-6 flex items-center gap-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
                <Icon className="h-5 w-5 text-slate-600" />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}