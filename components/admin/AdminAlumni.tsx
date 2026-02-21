"use client";

import React, { useState } from 'react';
import { 
  Table, 
  Badge, 
  Space, 
  Avatar, 
  Button, 
  Tooltip, 
  Select as AntSelect,
  Input as AntInput
} from 'antd';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  Trash2, 
  Ban, 
  MoreHorizontal 
} from 'lucide-react';

// --- Types ---
interface Alumni {
  key: string;
  name: string;
  email: string;
  batch: string;
  department: string;
  status: 'Approved' | 'Pending' | 'Inactive';
  avatar: string;
}

const AdminAlumni = () => {
  const [loading, setLoading] = useState(false);

  // --- Table Configuration ---
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Alumni) => (
        <div className="flex items-center gap-3">
          <Avatar 
            src={record.avatar} 
            size={40} 
            className="border border-slate-200 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 text-sm leading-tight">{text}</span>
            <span className="text-xs text-slate-500">{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      render: (batch: string) => (
        <span className="text-slate-600 font-medium">Class of {batch}</span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (dept: string) => (
        <span className="text-slate-500 text-sm">{dept}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Alumni['status']) => {
        const styles = {
          Approved: "bg-green-50 text-green-700 border-green-200",
          Pending: "bg-orange-50 text-orange-700 border-orange-200",
          Inactive: "bg-slate-100 text-slate-600 border-slate-200",
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styles[status]}`}>
            {status.toUpperCase()}
          </span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: Alumni) => (
        <div className="flex justify-end gap-2">
          <Tooltip title="View Profile">
            <Button 
              size="small" 
              icon={<Eye size={14} />} 
              className="flex items-center justify-center border-slate-200 text-slate-500 hover:text-blue-600"
            />
          </Tooltip>
          
          {record.status === 'Pending' ? (
            <Tooltip title="Approve">
              <Button 
                size="small" 
                icon={<Check size={14} />} 
                className="flex items-center justify-center border-green-200 text-green-600 hover:bg-green-50"
              />
            </Tooltip>
          ) : (
            <Tooltip title="Deactivate">
              <Button 
                size="small" 
                icon={<Ban size={14} />} 
                className="flex items-center justify-center border-slate-200 text-slate-400"
              />
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<Trash2 size={14} />} 
              className="flex items-center justify-center border-red-100"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const data: Alumni[] = [
    { key: '1', name: 'Rahul Sharma', email: 'rahul.s@example.com', batch: '2023', department: 'Computer Science', status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { key: '2', name: 'Amina Okafor', email: 'amina.o@example.com', batch: '2024', department: 'Economics', status: 'Pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina' },
    { key: '3', name: 'James Miller', email: 'jmiller@example.com', batch: '2024', department: 'Business Admin', status: 'Approved', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
    { key: '4', name: 'Sofia Garcia', email: 'sofia.g@example.com', batch: '2022', department: 'Engineering', status: 'Approved', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
    { key: '5', name: 'David Chen', email: 'd.chen@example.com', batch: '2021', department: 'Data Science', status: 'Inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  ];

  return (
    <div className="space-y-6">
      {/* --- Page Header --- */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Alumni</h1>
        <p className="text-slate-500 text-sm">View and manage registered alumni database</p>
      </div>

      {/* --- Search & Filters (Shadcn Style) --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <AntInput 
            placeholder="Search by name or email..." 
            className="pl-10 h-10 border-slate-200 rounded-lg hover:border-blue-400 focus:border-blue-500"
          />
        </div>
        
        <AntSelect 
          defaultValue="all-status" 
          className="w-[160px] h-10"
          options={[
            { value: 'all-status', label: 'All Status' },
            { value: 'approved', label: 'Approved' },
            { value: 'pending', label: 'Pending' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />

        <AntSelect 
          defaultValue="all-batches" 
          className="w-[160px] h-10"
          options={[
            { value: 'all-batches', label: 'All Batches' },
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
          ]}
        />
        
        <Button icon={<Filter size={16} />} className="h-10 border-slate-200 text-slate-600 font-medium">
          More Filters
        </Button>
      </div>

      {/* --- Data Table Container --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table 
            columns={columns} 
            dataSource={data} 
            loading={loading}
            pagination={{
                pageSize: 5,
                total: 4250, // Usually derived from your API response
                placement: ['bottomEnd'],
                showSizeChanger: true,
                showTotal: (total, range) => (
                <span className="text-slate-500 text-sm">
                    Showing {range[0]}-{range[1]} of {total} alumni
                </span>
                ),
                // If you want to keep the "Previous/Next" text style specifically:
                itemRender: (page, type, originalElement) => {
                if (type === 'prev') return <Button size="small" className="mr-2">Previous</Button>;
                if (type === 'next') return <Button size="small" className="ml-2">Next</Button>;
                return originalElement;
                }
            }}
            className="custom-table"
            rowClassName="hover:bg-slate-50/50 transition-colors"
        />
      </div>
    </div>
  );
}

export default AdminAlumni