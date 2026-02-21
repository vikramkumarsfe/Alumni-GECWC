"use client";
import { useState } from 'react';
import { Table, Avatar, Button, Tooltip, Select as AntSelect,Input as AntInput, Skeleton, message } from 'antd';
import { Search, Filter, Eye, Check, Trash2, Ban, Loader2} from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '@/utils/fetcher';
import ErrorState from '../shared/Errorstate';
import Link from 'next/link';
import clientCatchError from '@/utils/clientCatchError';
import axios from 'axios';

interface Alumni {
  key: string;
  name: string;
  email: string;
  batch: string;
  department: string;
  isActive: 'approved' | 'pending' | 'inactive';
  avatar: string;
}

const AdminAlumni = () => {
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = 12
  const { data : SWRData, isLoading, error } = useSWR(
    `/api/admin/users?page=${page}&limit=${pageSize}`,
    fetcher
  )

  if (isLoading) 
    return <Skeleton active />
  if (error) 
    return <ErrorState />

  const total = SWRData?.pagination.total || 12
  const data = SWRData?.data || []
  const columns = [
    {
      title: 'Profile',
      dataIndex: 'fullname',
      key: 'fullname',
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
        <span className="text-slate-600 font-medium">Batch of {batch}</span>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'branch',
      key: 'branch',
      render: (dept: string) => (
        <span className="text-slate-500 text-sm">{dept}</span>
      ),
    },
    {
      title: 'Reg No',
      dataIndex: 'regNo',
      key: 'regNO',
      render: (regNo: string) => (
        <span className="text-slate-500 text-sm">{regNo}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: Alumni['isActive']) => {
        const styles = {
          approved: "bg-green-50 text-green-700 border-green-200",
          pending: "bg-orange-50 text-orange-700 border-orange-200",
          inactive: "bg-slate-100 text-slate-600 border-slate-200",
        };
        return (
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styles[isActive]}`}>
            {isActive.toUpperCase()}
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
            <Link href={`/admin/alumni/${_._id}`}>
              <Button 
                size="small" 
                icon={<Eye size={14} />} 
                className="flex items-center justify-center border-slate-200 text-slate-500 hover:text-blue-600"
              />
            </Link>
          </Tooltip>
          
          {
          record.isActive === 'pending' ? (
            <Tooltip title="Approve">
              
              <Button 
                size="small" 
                icon={<Check size={14} />} 
                className="flex items-center justify-center border-green-200 text-green-600 hover:bg-green-50"
                onClick={()=>approveAlumni(_._id, _.email)}
                disabled={loading}
              >
                
              </Button>

              {/* <Button disabled={isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Submit"}</Button> */}
            </Tooltip>
          ) : (
            <Tooltip title="Deactivate">
              <Button 
                size="small" 
                icon={<Ban size={14} />} 
                className="flex items-center justify-center border-slate-200 text-slate-400"
                onClick={()=>inActiveAlumni(_._id, _.email)}
              />
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<Trash2 size={14} />} 
              className="flex items-center justify-center border-red-100"
              onClick={()=>deleteAlumni(_._id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ]


  const approveAlumni = async (id: string, email : string) => {
    try {
      setLoading(true)
      const payload = {
        isActive : "approved",
        email
      }
      const { data } = await axios.put(`/api/admin/users/${id}`,payload )

      message.success("Alumni approved")
      mutate(`/api/admin/users?page=${page}&limit=${pageSize}`)
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  }

  const deleteAlumni = async (id: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/admin/users/${id}` )
      message.success("Alumni approved")
      mutate(`/api/admin/users?page=${page}&limit=${pageSize}`)
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  }

  const inActiveAlumni = async (id: string, email : string) => {
    try {
      setLoading(true)
      const payload = {
        isActive : "pending",
        email
      }

      const { data } = await axios.put(`/api/admin/users/${id}`,payload )

      message.success("Alumni approved")
      mutate(`/api/admin/users?page=${page}&limit=${pageSize}`)
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  }
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

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
        <Table
          rowKey="_id" 
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize,
            total,
            onChange: (page) => setPage(page),
            showTotal: (total, range) => (
              <span className="text-slate-500 text-sm">
                Showing {range[0]}-{range[1]} of {total} alumni
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
}
export default AdminAlumni