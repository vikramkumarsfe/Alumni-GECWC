"use client";

import React, { useEffect, useState } from "react";
import { 
  Form, Input, Select, DatePicker, Button as AntButton, 
  message, Upload as AntUpload, Divider, Tag, InputNumber, 
  Skeleton
} from "antd";
import { 
  Upload, Save, Linkedin, Github, Twitter, Plus, Mail, Phone, MapPin, 
  Loader2
} from "lucide-react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader } from "../ui/card";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import { useSession } from "next-auth/react";
import { isToday } from "date-fns";

// --- Shadcn-style Layout Components ---
// const Card = ({ children }: { children: React.ReactNode }) => (
//   <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden mb-6">{children}</div>
// );
// const CardHeader = ({ title }: { title: string }) => (
//   <div className="px-6 py-5 border-b border-[#e2e8f0]"><h2 className="text-lg font-semibold text-[#0f172a]">{title}</h2></div>
// );
// const CardContent = ({ children }: { children: React.ReactNode }) => <div className="px-6 py-6">{children}</div>;

export default function EditProfile() {
  const [form] = Form.useForm();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const { data: session, status, update } = useSession();
  const [ loading , setLoading ] = useState(false)
  const { Option } = Select;

  useEffect(() => {
  if (session?.user?.profile?.skills) {
    setSkills(session.user.profile.skills);
  }
}, [session]);

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
  
      
    const user = session.user;
    const initialData = {
    fullname: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    batch: user.batch ||2019,
    branch: user.branch || "",
    regNo: user.regNo || "",
    DOB: user.DOB ? dayjs(user.DOB) : null,
    bio : user.bio || "",
    gender : user.gender || null,
    profile: {
      headline: user.profile?.headline || "",
      skills: user.profile?.skills || [],
      mentorship: user.profile?.mentorship || "",
      company: user.profile?.company || ""
    },
    address: {
      city: user.address?.city || "",
      state: user.address?.state ||  "",
      street : user.address?.street || "",
      pincode: user.address?.pincode ||  ""
    },
    socialLinks: {
      linkedIn: user.socialLinks?.linkedIn || "",
      github: user.socialLinks?.github || "",
      twitter: user.socialLinks?.twitter || ""
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      // Merge the local skills state into the form values before sending to API
      const payload = {
        ...values,
        profile: { ...values.profile, skills },
        // DOB needs to be converted back to a Date object for Mongoose
        DOB: values.DOB ? values.DOB.toDate() : null
      }

      await axios.put("/api/alumni", payload);

      await update({
        name: values.fullname,
        mobile: values.mobile,
        batch: values.batch,
        branch: values.branch,
        regNo: values.regNo,
        DOB: values.DOB ? values.DOB.toISOString() : null,
        bio: values.bio,
        gender : values.gender,
        profile: {
          ...values.profile,
          skills: skills, // Using your local state for skills
        },
        address: {
          ...values.address,
        },
        socialLinks: {
          ...values.socialLinks,
        },
      });
      console.log(payload)
      message.success("Profile updated successfully!");


    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleProfilePicture = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (event: any) => {
      const file = event.target.files?.[0]

      if(!file)
        return

      const formData = new FormData()

      formData.append("file", file)
      try {

        const options = {
          headers: { "Content-Type": "multipart/form-data" }
        }
        const data = await axios.post('/api/user/profile-picture', formData, options)

        await update({
        image :  data.data.public_link
      })
      message.success("image updated succesfully")
      }
      catch(err)
      {
        clientCatchError(err)
      }
      input.remove();
    }

    input.click()
    
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-12" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="max-w-[1000px] mx-auto px-4 pt-8 flex flex-col gap-6">
        
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Edit Profile</h1>
          <p className="text-sm mt-1 text-[#64748b]">Manage your GECWC account details.</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialData}
          requiredMark={false}
          className=" flex flex-col gap-5"
        >
          {/* ── Basic Info ── */}
          <Card>
            <CardHeader title="Account Details" />
            <CardContent>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="relative group">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden border border-gray-200">
                    <img src={"/images/user.png"} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <AntUpload showUploadList={false}>
                      <AntButton icon={<Upload size={14} />} onClick={handleProfilePicture}>Change Picture</AntButton>
                    </AntUpload>
                    <AntButton danger type="text">Remove</AntButton>
                  </div>
                  <p className="text-xs text-gray-500">Recommended size: 400x400px. Max size: 5MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
                <Form.Item name="email" label="Email Address">
                  <Input size="large" prefix={<Mail size={14} className="text-gray-400" />} disabled />
                </Form.Item>
                <Form.Item name="mobile" label="Mobile Number" rules={[{ required: true }]}>
                  <Input size="large" prefix={<Phone size={14} className="text-gray-400" />} />
                </Form.Item>
                <Form.Item name="DOB" label="Date of Birth">
                  <DatePicker size="large" className="w-full" />
                </Form.Item>

                <Form.Item name="gender" label="Gender" className="w-full" rules={[{ required: true }]}>
                  <Select size="large" >
                    <Option value="female">Female</Option>
                    <Option value="male">Male</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </Form.Item>
              </div>
            </CardContent>
          </Card>

          {/* ── Academic Info (Required Fields) ── */}
          <Card>
            <CardHeader title="Academic Information" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <Form.Item name="batch" label="Batch (Admission Year)" className="w-full" rules={[{ required: true }]}>
                  <InputNumber size="large"  placeholder="2026" />
                </Form.Item>
                <Form.Item name="branch" label="Branch" className="w-full" rules={[{ required: true }]}>
                  <Select size="large" >
                    <Option value="Computer Science & Engineering">Computer Science & Engineering</Option>
                    <Option value="Computer Science & Engineering(Cyber Security)">Computer Science & Engineering(Cyber Security)</Option>
                    <Option value="Civil Engineering">Civil Engineering</Option>
                    <Option value="VLSI">VLSI</Option>
                    <Option value="Electronics & Communication">Electronics & Communication</Option>
                    <Option value="Mechanical Engineering">Mechanical Engineering</Option>
                    <Option value="Electrical Engineering">Electrical Engineering</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="regNo" label="Registration No." className="w-full" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>
              </div>
            </CardContent>
          </Card>

          {/* ── Nested Address ── */}
          <Card>
            <CardHeader title="Contact Address" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Form.Item name={["address", "street"]} label="Street">
                  <Input size="large" />
                </Form.Item>
                <Form.Item name={["address", "city"]} label="City">
                  <Input size="large" />
                </Form.Item>
                <Form.Item name={["address", "state"]} label="State">
                  <Input size="large" />
                </Form.Item>
                <Form.Item name={["address", "pincode"]} label="Pincode">
                  <Input size="large" />
                </Form.Item>
              </div>
            </CardContent>
          </Card>

          {/* ── Professional Profile ── */}
          <Card>
            <CardHeader title="Profile & Bio" />
            <CardContent>
              <Form.Item name={["profile", "headline"]} label="Headline">
                <Input size="large" />
              </Form.Item>
              
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Skills</label>
                <div className="flex gap-2 mb-4">
                  <Input 
                    size="large" 
                    placeholder="Add skill..." 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onPressEnter={(e) => { e.preventDefault(); handleAddSkill(); }}
                  />
                  <AntButton size="large" icon={<Plus size={16} />} onClick={handleAddSkill}>Add</AntButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Tag key={skill} closable onClose={() => setSkills(skills.filter(s => s !== skill))} className="px-3 py-1 rounded-full">{skill}</Tag>
                  ))}
                </div>
              </div>

              <Form.Item name="bio" label="About Me (Bio)">
                <Input.TextArea rows={4} />
              </Form.Item>

              <div className="grid md:grid-cols-2  w-full gap-3">
                <Form.Item name={["profile", "company"]} label="Working At:">
                  <Input size="large" />
                </Form.Item>

                <Form.Item name={["profile", "mentorship"]} label="Mentorship Status : ">
                  <Input size="large" />
                </Form.Item>
              </div>

            </CardContent>
          </Card>

          {/* ── Social Links ── */}
          <Card>
            <CardHeader title="Social Presence" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <Form.Item name={["socialLinks", "linkedIn"]} label="LinkedIn">
                  <Input size="large" prefix={<Linkedin size={14} />} />
                </Form.Item>
                <Form.Item name={["socialLinks", "github"]} label="GitHub">
                  <Input size="large" prefix={<Github size={14} />} />
                </Form.Item>
                <Form.Item name={["socialLinks", "twitter"]} label="Twitter">
                  <Input size="large" prefix={<Twitter size={14} />} />
                </Form.Item>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 bg-white p-6 rounded-xl border border-gray-200">
            <AntButton size="large" onClick={()=>form.resetFields()}>Cancel</AntButton>
              <AntButton loading={loading} type="primary" size="large" htmlType="submit" className="bg-[#1565d8]" icon={<Save size={16} />}>
                Save Profile
              </AntButton>
          </div>
        </Form>
      </div>
    </div>
  );
}