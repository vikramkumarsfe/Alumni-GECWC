"use client";

import { useEffect, useState } from "react";
import { Modal, Tag, Avatar, Select, Input, Button, Table, Skeleton, Tooltip, message } from "antd";
import {
  FileText, Clock, CheckCircle, Search, Eye, Check, X,
  Link as LinkIcon, UserCheck, RotateCcw, Smartphone, MapPin,
  Calendar
} from "lucide-react";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import moment from "moment";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";

// --- Configuration for Repetitive Elements ---

const studentsData = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", branch: "Computer Science", batch: "2024", regNo: "REG2020412", date: "Oct 15, 2024", status: "Pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
  { id: 2, name: "Priya Patel", email: "priya.p@example.com", branch: "Mechanical", batch: "2024", regNo: "REG2020231", date: "Oct 14, 2024", status: "Pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
  { id: 3, name: "Amit Kumar", email: "amit.k@example.com", branch: "Electrical", batch: "2024", regNo: "REG2020105", date: "Oct 12, 2024", status: "Approved", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
];

const statsConfig = [
  { label: "Total Requests", value: "450", icon: FileText, color: "bg-slate-50", iconColor: "text-slate-600" },
  { label: "Pending Requests", value: "12", icon: Clock, color: "bg-amber-50", iconColor: "text-amber-600" },
  { label: "Approved Requests", value: "438", icon: CheckCircle, color: "bg-green-50", iconColor: "text-green-600" },
];

const filters = [
  { placeholder: "All Statuses", options: ["Pending", "Approved", "Rejected"] },
  { placeholder: "All Branches", options: ["Computer Science", "Mechanical", "Electrical", "Civil"] },
  { placeholder: "All Batches", options: ["2024", "2023", "2022"] },
];

export default function AdminBecomeAlumniPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState<{open: boolean, type: 'approve' | 'cancel' | null}>({
    open: false,
    type: null
  });
  const [currentPage, setCurrentPage] = useState(1)
  const [ pageSize, setPageSize] = useState(12)
  const [ sortOrder, setSortOrder] = useState('newest')
  const [ branch , setBranch] = useState("all")
  const [batch, setBatch] = useState("all")
  const [studentData, setStudentdata] = useState<any|null>(null)
  const [loading, setLoading] = useState(false)

  const { data, isLoading, error } = useSWR( 
          `/api/become-alumni?page=${currentPage}&limit=${pageSize}&branch=${branch}&batch=${batch}&sort=${sortOrder}`,
           fetcher,
          { keepPreviousData: true }
      )

      useEffect(()=>{
        if(data)
          setStudentdata(data.becomeAlumni)

      },[data])

      if(error)
        return <ErrorState />

      if(isLoading)
        return <Skeleton />

  const handleApproveRequest = async(id: string) => {
    try {
      setLoading(true)

      const payload = {
        status : "approved"
      }

      const data = await axios.put(`/api/become-alumni/${id}`, payload)

      message.success("Status is update!!")

      mutate(`/api/become-alumni?page=${currentPage}&limit=${pageSize}&branch=${branch}&batch=${batch}&sort=${sortOrder}`)

      setIsActionModalOpen({ open : false, type : null})
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: "STUDENT",
      key: "student",
      render: (record: any) => (
        <div className="flex items-center gap-3">
          {/* Thoda shadow aur border add kiya for depth */}
          <Avatar 
            src={record.student.image || "/images/alumni.png"} 
            size="large"
            className="border border-slate-200 shadow-sm" 
          />
          <div className="flex flex-col">
            {/* Name ko bold aur dark rakha, secondary info ko thoda light (Hierarchy) */}
            <span className="text-sm font-semibold text-slate-800">
              {record.student.fullname || "N/A"}
            </span>
            <span className="text-xs font-medium text-slate-500">
              {record.student.email || "No email"}
            </span>
          </div>
        </div>
      ),
    },
    { 
      title: "BRANCH", 
      key: "branch",
      render : (record: any) => (
        <span className="text-sm font-medium text-slate-600">
          {record.student.branch || "N/A"}
        </span>
      ) 
    },
    { 
      title: "BATCH", 
      key: "batch",
      render : (record: any) => (
        <Tag className="rounded-md border-slate-200 bg-slate-50 text-slate-600 font-semibold">
          {record.student.batch || "N/A"}
        </Tag>
      )
    },
    { 
      title: "REG NO.", 
      key: "regNo",
      render : (record: any) => (
        <span className="text-sm font-mono text-slate-500 tracking-tight">
          {record.student.regNo || "N/A"}
        </span>
      )
    },
    { 
      title: "APPLIED ON", // Fixed duplicate 'BATCH' title
      key: "createdAt",
      render : (record: any) => (
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Calendar size={14} className="text-slate-400" />
          {moment(record.createdAt).format('MMM DD, YYYY') || "N/A"}
        </div>
      )
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        // Made it case-insensitive to prevent bugs
        const currentStatus = (status || "pending").toLowerCase();
        
        let color = "default";
        if (currentStatus === "pending") color = "gold"; // AntD colors: processing/blue, success/green, warning/gold
        if (currentStatus === "approved") color = "green";
        
        return (
          <Tag 
            color={color} 
            className="rounded-full px-3 py-0.5 border-0 font-medium capitalize"
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (record: any) => {
        const currentStatus = (record.status || "pending").toLowerCase();

        return (
          <div className="flex gap-2">
            {/* Tooltips add kiye hain taaki user ko pata chale button kya karta hai */}
            <Tooltip title="View Details">
              <Button 
                type="text" // 'text' type se background hatega aur cleaner look aayega
                icon={<Eye size={18} />} 
                onClick={() => { setSelectedStudent(record); setIsDetailsModalOpen(true); }}
                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors"
              />
            </Tooltip>

            {currentStatus === "pending" ? (
              <Tooltip title="Approve Request">
                <Button 
                  type="text"
                  icon={<Check size={18} />} 
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                  onClick={() => { setSelectedStudent(record); setIsActionModalOpen({ open: true, type: 'approve' });}}
                />
              </Tooltip>
            ) : currentStatus === "approved" ? (
              <Tooltip title="Revert Approval">
                <Button 
                  type="text"
                  icon={<RotateCcw size={18} />} 
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors"
                  onClick={() => { setSelectedStudent(record); setIsActionModalOpen({ open: true, type: 'cancel' }); }}
                />
              </Tooltip>
            ) : null}
          </div>
        );
      },
    },
  ]


  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] min-h-screen p-1 md:p-2">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 m-0">Student to Alumni Conversion</h1>
          <p className="text-sm text-gray-500 mt-1">Review and manage graduation-based role transitions</p>
        </div>

        {/* Stats - Mapped */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsConfig.map((stat, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 mb-1">{stat.label}</span>
                <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center ${stat.iconColor}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Filters - Mapped */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center bg-white">
            <Input
              prefix={<Search size={16} className="text-gray-400" />}
              placeholder="Search by name, email..."
              className="w-full md:w-80 bg-slate-50 border-none h-10"
            />
            <div className="flex gap-3 overflow-x-auto">
              {filters.map((f, i) => (
                <Select key={i} placeholder={f.placeholder} className="min-w-[140px]" options={f.options.map(o => ({ label: o, value: o }))} />
              ))}
            </div>
          </div>

          <Table 
            columns={columns} 
            dataSource={studentData} 
            className="custom-ant-table"
            pagination={{ pageSize: 8 }}
          />
        </div>
      </div>

      {/* 1. Detailed View Modal (Original Design) */}
      <Modal
        title="Request Details"
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={null} // Custom footer rendered inside body
        width={550}
      >
        {selectedStudent && (
          <div className="flex flex-col">
            <div className=" overflow-y-auto max-h-[60vh] flex flex-col gap-3 mb-4">
              {/* Header Info */}
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.student.image || "/images/alumni.png"}
                  alt={selectedStudent.student.fullname  || "N/A"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex flex-col items-start">
                  <h4 className="text-lg font-semibold m-0 mb-1">
                    {selectedStudent.student.fullname || "N/A"}
                  </h4>
                  <p className="text-sm text-gray-500 m-0 mb-2">
                    {selectedStudent.student.email || "N/A"}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      selectedStudent.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedStudent.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedStudent.status}
                  </span>
                </div>
              </div>

              {/* Student Info Section */}
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b uppercase tracking-wide">
                  Student Info
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Mobile
                    </label>
                    <span className="text-sm text-slate-900">
                      { selectedStudent.student.mobile || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Reg Number
                    </label>
                    <span className="text-sm text-slate-900">
                      {selectedStudent.student.regNo || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Branch
                    </label>
                    <span className="text-sm text-slate-900">
                      {selectedStudent.student.branch || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Batch
                    </label>
                    <span className="text-sm text-slate-900">
                      {selectedStudent.student.batch || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 col-span-2">
                    <label className="text-xs font-medium text-gray-500">
                      Address
                    </label>
                    <span className="text-sm text-slate-900">
                      {selectedStudent.student.address.street || "N/A"}, {selectedStudent.student.address.city || "N/A"}, {selectedStudent.student.address.state || "N/A"}, {selectedStudent.student.address.state || "N/A"}, {selectedStudent.student.address.country || "N/A"}, {selectedStudent.student.address.pincode || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="flex flex-col">
                <h5 className="text-sm font-semibold text-slate-900 mb-3 pb-2 border-b uppercase tracking-wide">
                  Profile Info
                </h5>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Headline
                    </label>
                    <span className="text-sm text-slate-900">
                      { selectedStudent.student.profile.headline || "N/A"} | { selectedStudent.student.profile.company || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Company
                    </label>
                    <span className="text-sm text-slate-900">
                      { selectedStudent.student.profile.company || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent && selectedStudent.student.profile.skills.map(
                        (skill: any) => (
                          <span
                            key={skill}
                            className="bg-blue-50 text-[#0b6ff0] px-2.5 py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-500">
                      Bio
                    </label>
                    <p className="text-sm text-slate-900 m-0 leading-relaxed">
                      { selectedStudent.student.bio || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Footer */}
            {selectedStudent.status === "Pending" && (
              <div className="px-6 py-2 border-t bg-gray-50 rounded-b-lg">
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-xs font-medium text-gray-500">
                    Rejection Reason (Required for rejection)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white text-sm outline-none focus:border-[#0b6ff0]"
                    placeholder="e.g. Profile incomplete, please add internship details..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="flex-1 py-2 px-4 border border-gray-200 rounded-md text-red-600 text-sm font-medium hover:bg-red-50 hover:border-red-600 transition-colors"
                  >
                    Reject Request
                  </button>
                  <button
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                    //   setIsApproveModalOpen(true);
                    }}
                    className="flex-1 py-2 px-4 border border-transparent bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Approve Conversion
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 2. Action Confirmation Modal (Approve/Cancel) */}
      <Modal
        open={isActionModalOpen.open}
        onCancel={() => setIsActionModalOpen({ open: false, type: null })}
        footer={null}
        width={400}
        centered
      >
        <div className="flex flex-col items-center text-center p-4 gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isActionModalOpen.type === 'approve' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {isActionModalOpen.type === 'approve' ? <UserCheck size={28} /> : <RotateCcw size={28} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 m-0">
              {isActionModalOpen.type === 'approve' ? 'Approve Conversion?' : 'Cancel Conversion?'}
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to {isActionModalOpen.type === 'approve' ? 'convert this student to alumni' : 'revert this alumni back to student'}?
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <Button block onClick={() => setIsActionModalOpen({ open: false, type: null })}>No, Keep it</Button>
            <Button 
              block 
              type="primary" 
              danger={isActionModalOpen.type === 'cancel'}
              className={isActionModalOpen.type === 'approve' ? "bg-green-600 hover:bg-green-700 border-none" : ""}
              onClick={()=>handleApproveRequest(selectedStudent._id)}
              loading={loading}
            >
              Yes, Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}