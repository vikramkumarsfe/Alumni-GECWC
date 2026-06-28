"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, Send, Users, FileText, Plus, Search, Eye, Copy, Pencil, Trash2, TrendingUp } from "lucide-react";
import { Modal, Form, Input, Radio, Select, Button } from "antd";
import NewsletterTemplateModal from "../shared/NewsLetterTemplate";

// Safely import ReactQuill dynamically for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-32 w-full bg-slate-50 border border-slate-200 rounded-md animate-pulse" />,
});


const stats = [
  { label: "Total Campaigns", value: "48", trend: "+6 this month", icon: Mail, bg: "bg-blue-50 text-blue-600" },
  { label: "Emails Sent", value: "18,240", trend: "+1.2k this month", icon: Send, bg: "bg-green-50 text-green-600" },
  { label: "Active Recipients", value: "3,412", trend: "+84 new this week", icon: Users, bg: "bg-purple-50 text-purple-600" },
  { label: "Draft Campaigns", value: "7", trend: "Awaiting publish", icon: FileText, bg: "bg-amber-50 text-amber-600", neutral: true },
];

const campaigns = [
  { id: 1, name: "Annual Reunion 2024", type: "Event Invitation", subject: "You're invited to the Annual Alumni Reunion!", audience: "All Alumni", count: "3,412", status: "Sent", created: "Oct 01, 2024", scheduled: "Oct 05, 2024" },
  { id: 2, name: "Profile Completion Reminder", type: "Profile Completion", subject: "Complete your alumni profile today", audience: "Batch 2022", count: "480", status: "Scheduled", created: "Oct 15, 2024", scheduled: "Oct 20, 2024" },
  { id: 3, name: "Tech Workshop Invitation", type: "Event Invitation", subject: "Join our upcoming AI & ML Workshop", audience: "CSE Dept", count: "620", status: "Sent", created: "Sep 25, 2024", scheduled: "Sep 28, 2024" },
  { id: 4, name: "November Newsletter", type: "Newsletter", subject: "Alumni Monthly Digest — November 2024", audience: "All Alumni", count: "3,412", status: "Draft", created: "Oct 18, 2024", scheduled: "—" },
  { id: 5, name: "Graduation Reminder — 2024", type: "Graduation Reminder", subject: "Important: Your graduation ceremony details", audience: "Batch 2024", count: "512", status: "Cancelled", created: "Oct 10, 2024", scheduled: "Oct 14, 2024" },
  { id: 6, name: "Alumni Spotlight — October", type: "Alumni Spotlight", subject: "Meet this month's featured alumni", audience: "All Alumni", count: "3,412", status: "Draft", created: "Oct 19, 2024", scheduled: "—" },
];

const batches = ["2019", "2020", "2021", "2022", "2023", "2024"];

export default function AdminEmailCampaign() {
  const [open, setOpen] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState(["2019", "2020"]);
  const [form] = Form.useForm();

  const toggleBatch = (batch: string) => {
    setSelectedBatches(prev => prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]);
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "Sent": return "bg-green-100 text-green-700";
      case "Scheduled": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-slate-100 text-slate-600";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form Values Submitted:", { ...values, selectedBatches });
    setOpen(false);
    form.resetFields();
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">
              <Mail size={16} />
            </div>
            Email Campaigns
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create and send personalized email campaigns to alumni and students.
          </p>
        </div>

        {/* ===== ANTD MODAL TRIGGER ===== */}
        <button 
          onClick={() => setOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md shadow-sm transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={15} /> Create Campaign
        </button>

        {/* ===== ANTD MODAL COMPONENT ===== */}
{/* <Modal
  title={
    <div className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4 -mx-6 px-6">
      <div className="w-7 h-7 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">
        <Mail size={16} />
      </div>
      Create New Campaign
    </div>
  }
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  width={780}
  centered
  destroyOnClose
  className="custom-antd-modal"
  footer={[
    <Button 
      key="cancel" 
      onClick={() => setIsModalOpen(false)} 
      className="rounded-lg h-9 border-slate-200 text-slate-600 hover:text-slate-900 font-medium transition"
    >
      Cancel
    </Button>,
    <Button 
      key="draft" 
      onClick={() => setIsModalOpen(false)} 
      className="rounded-lg h-9 border-slate-200 text-slate-600 hover:text-slate-900 font-medium transition"
    >
      Save Draft
    </Button>,
    <Button 
      key="preview" 
      type="default" 
      className="rounded-lg h-9 border-blue-600 text-blue-600 hover:bg-blue-50/50 font-medium transition"
    >
      Preview Email
    </Button>,
    <Button 
      key="submit" 
      type="primary" 
      className="rounded-lg h-9 bg-blue-600 hover:bg-blue-700 font-medium inline-flex items-center gap-1.5 shadow-sm transition" 
      onClick={() => form.submit()}
    >
      <Send size={14} /> Send Campaign
    </Button>
  ]}
>
  <Form
    form={form}
    layout="vertical"
    onFinish={handleFormSubmit}
    initialValues={{ audience: "All Alumni", delivery: "Send Immediately", timezone: "IST (UTC+5:30)" }}
    className="pt-4 max-h-[68vh] overflow-y-auto px-1 flex flex-col gap-6 scrollbar-thin"
  >

    <div className="bg-slate-50/40 border border-slate-100/80 rounded-xl p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 pb-1 border-b border-slate-100">
        Basic Information
      </div>
      <div className="grid grid-cols-2 gap-x-5">
        <Form.Item 
          name="name" 
          label={<span className="font-semibold text-slate-700 text-xs">Campaign Name</span>} 
          rules={[{ required: true, message: 'Please enter a campaign name' }]}
        >
          <Input 
            placeholder="e.g. Annual Reunion 2024" 
            className="bg-white border-slate-200 hover:border-blue-400 focus:border-blue-500 rounded-lg py-2 transition" 
          />
        </Form.Item>
        <Form.Item 
          name="subject" 
          label={<span className="font-semibold text-slate-700 text-xs">Email Subject</span>} 
          rules={[{ required: true, message: 'Please enter an email subject' }]}
        >
          <Input 
            placeholder="e.g. You're invited!" 
            className="bg-white border-slate-200 hover:border-blue-400 focus:border-blue-500 rounded-lg py-2 transition" 
          />
        </Form.Item>
        <Form.Item 
          name="category" 
          label={<span className="font-semibold text-slate-700 text-xs">Campaign Category</span>} 
          className="col-span-2 mb-1"
        >
          <Select placeholder="Select a category..." className="h-10 custom-select-rounded">
            <Select.Option value="General">General Announcement</Select.Option>
            <Select.Option value="Spotlight">Alumni Spotlight</Select.Option>
            <Select.Option value="Invitation">Event Invitation</Select.Option>
            <Select.Option value="Newsletter">Newsletter</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </div>

    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 pb-1 border-b border-slate-100">
        Email Composer
      </div>
      <Form.Item
  name="body"
  valuePropName="value"
  getValueFromEvent={(value) => value}
  rules={[
    { required: true, message: "Please compose your email content" }
  ]}
>
  <ReactQuill
    theme="snow"
    onChange={(value) => form.setFieldValue("body", value)}
  />
</Form.Item>
    </div>


    <div className="bg-slate-50/40 border border-slate-100/80 rounded-xl p-5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 pb-1 border-b border-slate-100">
        Recipient Selection
      </div>
      <Form.Item name="audience" className="mb-4">
        <Radio.Group className="grid grid-cols-2 gap-3 w-full">
          {[
            { label: "All Alumni", value: "All Alumni" },
            { label: "All Students", value: "All Students" },
            { label: "Specific Batch", value: "Specific Batch" },
            { label: "Specific Department", value: "Specific Department" }
          ].map((item) => (
            <Radio 
              key={item.value} 
              value={item.value} 
              className="font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-300 rounded-lg p-3 m-0 transition flex items-center [&.ant-radio-wrapper-checked]:border-blue-500 [&.ant-radio-wrapper-checked]:bg-blue-50/30"
            >
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      
      <div className="mt-2 bg-white border border-slate-200 rounded-lg p-4">
        <div className="text-xs font-semibold text-slate-500 mb-2.5">Target Batch Years:</div>
        <div className="flex flex-wrap gap-2">
          {batches.map((batch) => {
            const isSelected = selectedBatches.includes(batch);
            return (
              <span 
                key={batch} 
                onClick={() => toggleBatch(batch)}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-semibold cursor-pointer select-none transition ${
                  isSelected 
                  ? "bg-blue-600 border-blue-600 text-white shadow-xs" 
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                {batch}
              </span>
            );
          })}
        </div>
      </div>
    </div>

    <div className="bg-slate-50/40 border border-slate-100/80 rounded-xl p-5 mb-2">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4 pb-1 border-b border-slate-100">
        Delivery Options
      </div>
      <Form.Item name="delivery" className="mb-4">
        <Radio.Group className="flex gap-4">
          <Radio 
            value="Send Immediately" 
            className="font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-300 rounded-lg px-4 py-2.5 m-0 transition flex items-center [&.ant-radio-wrapper-checked]:border-blue-500 [&.ant-radio-wrapper-checked]:bg-blue-50/30"
          >
            Send Immediately
          </Radio>
          <Radio 
            value="Schedule Email" 
            className="font-medium text-slate-700 bg-white border border-slate-200 hover:border-blue-300 rounded-lg px-4 py-2.5 m-0 transition flex items-center [&.ant-radio-wrapper-checked]:border-blue-500 [&.ant-radio-wrapper-checked]:bg-blue-50/30"
          >
            Schedule Email
          </Radio>
        </Radio.Group>
      </Form.Item>
      
      <div className="grid grid-cols-3 gap-4 bg-white border border-slate-200 rounded-lg p-4">
        <Form.Item name="scheduleDate" label={<span className="text-xs font-semibold text-slate-600">Schedule Date</span>} className="mb-0">
          <Input defaultValue="Nov 05, 2024" className="border-slate-200 rounded-md py-1.5" />
        </Form.Item>
        <Form.Item name="scheduleTime" label={<span className="text-xs font-semibold text-slate-600">Schedule Time</span>} className="mb-0">
          <Input defaultValue="10:00 AM" className="border-slate-200 rounded-md py-1.5" />
        </Form.Item>
        <Form.Item name="timezone" label={<span className="text-xs font-semibold text-slate-600">Timezone</span>} className="mb-0">
          <Select className="w-full h-9 custom-select-rounded">
            <Select.Option value="IST (UTC+5:30)">IST (UTC+5:30)</Select.Option>
            <Select.Option value="UTC">UTC</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </div>
  </Form>
</Modal> */}
      </div>

      {/* ===== METRICS ROW ===== */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</span>
              <span className={`text-xs font-semibold flex items-center gap-0.5 mt-0.5 ${stat.neutral ? "text-slate-400" : "text-green-600"}`}>
                {!stat.neutral && <TrendingUp size={12} />}
                {stat.trend}
              </span>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* ===== DATA TABLE CARD ===== */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Table Filters Subheader */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-60">
              <Search size={15} className="text-slate-400 shrink-0" />
              <input type="text" placeholder="Search campaigns..." className="bg-transparent text-sm text-slate-900 placeholder-slate-400 w-full focus:outline-none" />
            </div>
            <select className="bg-white border border-slate-200 rounded-md p-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer">
              <option>All Statuses</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-md p-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer">
              <option>All Audiences</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-md p-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer">
              <option>All Dates</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Sort By:</span>
            <select className="bg-white border border-slate-200 rounded-md p-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer">
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* Pure Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4 pl-5">Campaign Name</th>
                <th className="p-4">Email Subject</th>
                <th className="p-4">Audience</th>
                <th className="p-4">Recipients</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created On</th>
                <th className="p-4">Scheduled Date</th>
                <th className="p-4 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-900">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/40 transition">
                  <td className="p-4 pl-5">
                    <div className="font-semibold text-slate-900">{camp.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{camp.type}</div>
                  </td>
                  <td className="p-4 max-w-[180px] truncate text-slate-800">{camp.subject}</td>
                  <td className="p-4 text-slate-600">{camp.audience}</td>
                  <td className="p-4 font-semibold">{camp.count}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(camp.status)}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-xs">{camp.created}</td>
                  <td className="p-4 text-slate-400 text-xs">{camp.scheduled}</td>
                  <td className="p-4 pr-5">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View" className="w-7 h-7 border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:text-slate-900 bg-white transition"><Eye size={13} /></button>
                      <button title="Duplicate" className="w-7 h-7 border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:text-slate-900 bg-white transition"><Copy size={13} /></button>
                      <button title="Edit" className="w-7 h-7 border border-slate-200 rounded flex items-center justify-center text-slate-400 hover:text-slate-900 bg-white transition"><Pencil size={13} /></button>
                      <button title="Delete" className="w-7 h-7 border border-red-100 rounded flex items-center justify-center text-red-500 hover:bg-red-50 bg-red-50/30 transition"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Toolbar */}
        <div className="p-4 px-5 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-400 bg-white">
          <span>Showing 1 to 6 of 48 campaigns</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition">Previous</button>
            <button className="px-3 py-1.5 bg-blue-600 text-white border border-blue-600 rounded-md shadow-xs">1</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition">2</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition">8</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition">Next</button>
          </div>
        </div>
      </div>


      <NewsletterTemplateModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(month) => {
          console.log(month);
          // Fetch template here
        }}
      />
    </div>
  );
}