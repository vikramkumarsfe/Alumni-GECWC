'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-appBg flex font-sans">
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-6">
        
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor alumni registrations and membership metrics.</p>
        </header>

        {/* Top Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Alumni : Total Count" value="229" />
          <StatCard 
            title="Alumni : Accounts Created" 
            value="81" 
            showButton 
            badge="Active" 
          />
          <StatCard 
            title="Alumni : Pending" 
            value="138" 
            showButton 
            variant="warning" 
          />
        </section>

        {/* Data Overview Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Alumni Data Overview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DataCard label="Registered Alumni" count="6" />
            <DataCard label="Verified Alumni" count="217" status="success" />
            <DataCard label="Rejected Alumni" count="4" status="error" />
          </div>
        </section>

      </main>
    </div>
  )
}

/** * Sub-components for cleaner structure
 */

function SidebarItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <li className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors cursor-pointer group">
      <span className="text-gray-400 group-hover:text-primary transition-colors">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </li>
  )
}

function StatCard({ title, value, showButton, badge, variant }: any) {
  return (
    <Card className="rounded-xl shadow-sm border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-tight">{title}</p>
          {badge && <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100"> {badge} </Badge>}
        </div>
        <h2 className="text-3xl font-bold mt-3 text-gray-900">{value}</h2>
        {showButton && (
          <Button variant="outline" size="sm" className="mt-4 border-gray-300 text-primary hover:text-primaryDark hover:bg-primaryLight border-none shadow-none p-0 h-auto font-semibold">
            View Details →
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function DataCard({ label, count, status, isCurrency }: any) {
  const getStatusColor = () => {
    if (status === 'success') return 'text-green-600';
    if (status === 'error') return 'text-red-600';
    return 'text-gray-900';
  }

  return (
    <Card className="rounded-xl border-gray-200 shadow-sm overflow-hidden group">
      <div className="h-1 w-full bg-transparent group-hover:bg-primary transition-colors" />
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getStatusColor()}`}>
          {count}
        </div>
        <Button 
          variant="outline" 
          className="mt-4 w-full border-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-all rounded-md"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}