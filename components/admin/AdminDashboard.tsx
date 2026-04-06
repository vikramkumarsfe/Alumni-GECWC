"use client";

import React from 'react';
import { Table, Badge, Space, Avatar, Button, ConfigProvider, Tooltip } from 'antd';
import { Users, Calendar, BarChart3,Clock, ExternalLink} from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import Link from 'next/link';

// --- Internal Stat Card Component (Shadcn Style) ---
const StatCard = ({ title, value }: any) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-center items-start">
            <div className='space-y-2'>
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{value}</h3>
                <p className="text-[14px] font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
            </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { data : SWRData, isLoading, error } = useSWR(
    `/api/admin/users?limit=5`,
    fetcher
  )
  const { 
    data: AlumniNewData, 
    error: AlumniNewError, 
    isLoading: AlumniNewIsLoading 
  } = useSWR('/api/admin/all-users?new=true', fetcher);
  const { 
    data: AlumniPendingData, 
    error: AlumniPendingError, 
    isLoading: AlumniPendingIsLoading 
  } = useSWR('/api/admin/all-users?pending=true', fetcher);
  const { data : EventData , error : EventError, isLoading : EventIsLoading} = useSWR('/api/event/all-events?upcoming=true', fetcher)

  const columns = [
    {
      title: 'Member',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.avatar} className="border border-slate-100" />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 text-sm">{text}</span>
            <span className="text-[11px] text-slate-400">{record.email}</span>
          </div>
        </Space>
      ),
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      render: (batch: string) => (
        <span className="text-slate-600 font-medium">Batch of {batch}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: string) => {
        const styles = {
          approved: "bg-green-50 text-green-700 border-green-200",
          pending: "bg-orange-50 text-orange-700 border-orange-200",
          inactive: "bg-slate-100 text-slate-600 border-slate-200",
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${isActive === "pending" ? styles.pending : ""}`}>
            {isActive.toUpperCase()}
          </span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="View Profile">
            <Link href={`/admin/alumni/${_._id}`} target='_blank'>
              <Button type="text" icon={<ExternalLink size={16} className="text-slate-400" />} />
            </Link>
          </Tooltip>
          <Link href="/admin/alumni">
            <Button size="small" type="primary" className="text-[11px] font-bold h-7 shadow-none bg-blue-600">
              Review
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const data = SWRData?.data || []

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#0b6ff0', borderRadius: 8 } }}>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
            <p className="text-slate-500 text-sm">Welcome back, here is what's happening today.</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard title="New Members" value={ AlumniNewData && AlumniNewData.total}  icon={<Users size={20}/>} trend="+8%" color="grey" />
          <StatCard title="Active Events" value= { EventData && EventData.total} icon={<Calendar size={20}/>} description="4 starting this week" color="green" />
          <StatCard title="Pending Review" value={AlumniPendingData && AlumniPendingData.total} icon={<Clock size={20}/>} trend="+12" color="orange" />
        </div>

        {/* Main Data Table (Shadcn Card Wrapper) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" />
              Recent Registrations
            </h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Live Update</span>
          </div>
          
          <div className="overflow-x-auto overflow-y-hidden">
            <Table 
              key="_id"
              columns={columns} 
              dataSource={data} 
              pagination={false} 
              className="px-2"
            />
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <Link href="/admin/alumni">
            <Button type="link" className="text-xs font-bold text-blue-600">
              View All Members
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default AdminDashboard