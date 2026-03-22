"use client";

import React, { useState } from "react";
import { Save, KeyRound, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import { Form, Input, Select, Divider, Modal, Button as AntdButton, message, Skeleton } from "antd";

// shadcn/ui components (assumed installed via shadcn CLI)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AlumniSettingsPage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: session, status, update } = useSession();

    if (status === "loading") {
        return (
            <div className="max-w-7xl mx-auto p-8">
                <Skeleton active avatar paragraph={{ rows: 4 }} />
                <div className="grid grid-cols-12 gap-6 mt-6">
                    <div className="col-span-8"><Skeleton active paragraph={{ rows: 6 }} /></div>
                    <div className="col-span-4"><Skeleton active paragraph={{ rows: 6 }} /></div>
                </div>
            </div>
        );
    }

    if (!session || !session.user) {
        return <div className="flex justify-center items-center h-screen">Not authenticated</div>;
    }
    
    const user = session.user
    const name = user.name 
    const email = user.email
    const mobile = user.mobile
  const handleUpdate = async(values :any ) => {
    try {
      setLoading(true)
      const payload = {
        password : values.currentPassword,
        newPassword : values.newPassword
      }
      const { data } = await axios.put('/api/user/change-password', payload)

      message.success("password Updated successfully!")
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
    form.resetFields()

  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-1 md:px-4 md:ml-20">
      <Form
        layout="vertical"
        className="max-w-[900px] mx-auto flex flex-col gap-6"
        initialValues={{
          email: email,
          name: name,
          phone: mobile,
          timezone: "utc-5:30",
          publicProfile: true,
          newMessages: true,
          mentorshipUpdates: true
        }}
      >
        {/* 1. ACCOUNT INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your basic account details and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Form.Item name="name" label="Name" tooltip="Contact admin to change university email">
                <Input  className="h-10" readOnly />
              </Form.Item>
              <Form.Item name="email" label="Email Asdress">
                <Input placeholder="email@example.com" className="h-10" readOnly/>
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Form.Item name="phone" label="Phone Number">
                <Input className="h-10" readOnly/>
              </Form.Item>
              <Form.Item name="timezone" label="Timezone" >
                <Select className="h-10 w-full" options={[
                  { value: 'utc-8', label: '(UTC-08:00) Pacific Time' },
                  { value: 'utc-5', label: '(UTC-05:00) Eastern Time' },
                  { value: 'utc+5:30', label: '(UTC+05:30) India Standard Time' },
                ]}  disabled/>
              </Form.Item>
            </div>
            <div className="flex justify-end">
              <Link href="/alumni/profile/edit">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                  <Save className="mr-2 h-4 w-4" /> Edit
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 2. PRIVACY & VISIBILITY */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Visibility</CardTitle>
            <CardDescription>Manage what information is visible to others.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100">
            <ToggleRow name="publicProfile" title="Public Profile" description="Visible in the Alumni & Student Directory." />
            <ToggleRow name="showEmail" title="Show Email Address" description="Allow users to see your email." />
            <ToggleRow name="showPhone" title="Show Phone Number" description="Allow users to see your phone number." />
          </CardContent>
        </Card>

        {/* 3. SECURITY */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your password and account security.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-medium">Change Password</p>
              <p className="text-[13px] text-slate-500 md:flex hidden">Update your password regularly.</p>
            </div>
            <Button variant="outline" onClick={()=>setIsModalOpen(true)} className="cursor-pointer">
              <KeyRound className=" h-4 md:w-4 w-2" /> Update Password
            </Button>
          </CardContent>
        </Card>
      </Form>

      <Modal
        title={
          <div className="pt-2">
            <h2 className="text-[20px] font-semibold text-slate-900">Update Password</h2>
            <p className="text-[14px] font-normal text-slate-500 mt-1">
              Ensure your account is using a secure and robust password.
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={handleClose}
        footer={false}
        width={480}
        centered
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          className="mt-6 space-y-4"
          onFinish={handleUpdate}
        >
          {/* Current Password */}
          <Form.Item
            name="currentPassword"
            label={<span className="text-[14px] font-medium">Current Password</span>}
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password
              placeholder="********"
              className="h-10 rounded-md"
              iconRender={(visible) => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="newPassword"
            label={<span className="text-[14px] font-medium">New Password</span>}
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              className="h-10 rounded-md"
              iconRender={(visible) => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            />
          </Form.Item>

          {/* Password Requirements UI */}
          {/* <div className="space-y-2 mb-4 px-1">
            <RequirementItem met={true} text="Minimum 8 characters" />
            <RequirementItem met={false} text="At least one uppercase letter" />
            <RequirementItem met={false} text="At least one number or symbol" />
          </div> */}

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label={<span className="text-[14px] font-medium">Confirm New Password</span>}
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              className="h-10 rounded-md"
              iconRender={(visible) => (visible ? <Eye size={16} /> : <EyeOff size={16} />)}
            />
          </Form.Item>

          <AntdButton 
            type="primary" 
            variant="outlined" 
            className="!px-4 !py-3 !bg-rose-400" 
            htmlType="submit"
            loading={loading}
          >
            Save Password
          </AntdButton>
        </Form>
      </Modal>
    </div>
  );
}

// Helper component for the rows to keep the main return clean
function ToggleRow({ name, title, description }: { name: string, title: string, description: string }) {
  return (
    <Form.Item name={name} valuePropName="checked" className="mb-0 py-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-slate-900">{title}</span>
          <span className="text-[13px] text-slate-500">{description}</span>
        </div>
        <Switch defaultChecked disabled /> {/* Using shadcn/ui Switch */}
      </div>
    </Form.Item>
  );
}
