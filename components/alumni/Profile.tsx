"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {  MapPin, Building2, Calendar, Edit2, Linkedin, Github, Globe, Twitter, Lock, Shield, Bell, ChevronRight, Plus, Verified } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { message, Skeleton, Space } from 'antd';
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";

const AlumniProfile = () => {
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

    const user = session.user;

    // Data Mapping Configurations
    const basicInfo = [
        { label: "Full Name", value: user?.name ?? "Student User" },
        { label: "Email Address", value: user?.email ?? "No email provided" },
        { label: "Phone Number", value: user?.mobile ?? "Not provided" },
        { label: "Gender", value: user?.gender ?? "Not provided" },
        { label: "Date of Birth", value: user?.DOB ? new Date(user.DOB).toLocaleDateString() : "Not provided" },
        { 
            label: "Address", 
            value: `${user?.address?.street ?? 'Street'}, ${user?.address?.city ?? 'City'}, ${user?.address?.state ?? 'State'}`
        },
    ];

    let  completionYear = 2022

    if(user?.batch)
        completionYear = user?.batch + 4

    const academicInfo = [
        { label: "College/University", value: "Government Engineering College West Champaran" },
        { label: "Degree", value: "Bachelor of Technology (B.Tech)" },
        { label: "Department", value: user?.branch ?? "Engineering" },
        { label: "Expected Graduation Year", value: completionYear ?? "N/A" },
        { label: "Batch Year", value: user?.batch ?? "N/A" },
        { label: "Student ID / Roll No.", value: user?.regNo ?? "N/A" },
    ];

    const socialLinks = [
        { icon: <Linkedin size={18} />, label: user?.socialLinks?.linkedIn ?? "Not added", color: "text-slate-400" },
        { icon: <Github size={18} />, label: user?.socialLinks?.github ?? "Not added", color: "text-slate-400" },
        { icon: <Globe size={18} />, label: "Portfolio not added", color: "text-slate-400" },
        { icon: <Twitter size={18} />, label: user?.socialLinks?.twitter ?? "Not added", color: "text-slate-400" },
    ];

    const accountSettings = [
        { icon: <Lock size={18} />, label: "Change Password" },
        { icon: <Shield size={18} />, label: "Privacy Settings" },
        { icon: <Bell size={18} />, label: "Email Preferences" },
    ];

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "ST";

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
        <div className="max-w-7xl mx-auto px-1 md:px-8 py-6 space-y-6 bg-[#f8fafc]">

            {/* 1. Header Hero Section */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="h-4 md:h-8" />
                <CardContent className="relative pt-0 px-4 md:px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12 items-center md:items-end">
                        <Avatar className="w-28 h-28 rounded-full border-4 border-white shadow-sm flex-shrink-0">
                            <AvatarImage src={user?.image || '/images/user.png'} alt={user?.name || ""} />
                            <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 pb-2">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                                        {user?.name ?? "Student User"}
                                        <Verified className="text-blue-400 hover:text-blue-600 p-0" />
                                    </h1>
                                    <p className="text-slate-600 mt-1">Alumni</p>
                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Building2 size={16} /> {user?.branch ?? "Branch"}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Calendar size={16} /> Class of {user?.batch ?? "N/A"}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} /> 
                                            {user?.address?.city ?? "City"}, {user?.address?.state ?? "State"}
                                        </span>
                                    </div>
                                </div>
                                <Space size="middle" className="mt-3 md:mt-0">
                                    <Button 
                                        variant="outline" 
                                        className="cursor-pointer text-slate-600 border-slate-200"
                                        onClick={handleProfilePicture}
                                    >
                                            Upload Picture
                                    </Button>
                                    <Link href="/alumni/profile/edit">
                                        <Button 
                                            className="cursor-pointer  bg-blue-600 hover:bg-blue-700 text-white"
                                            
                                        >
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </Space>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">

                    {/* 2. Basic Information */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Basic Information</CardTitle>
                            {/* <Button variant="ghost" size="sm" className="text-slate-400 font-normal hover:bg-transparent">
                                <Edit2 size={14} className="mr-1" /> Edit
                            </Button> */}
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {basicInfo.map((info, idx) => (
                                <div key={idx}>
                                    <p className="text-xs text-slate-400 mb-1">{info.label}</p>
                                    <p className="text-sm font-medium">{info.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 3. Academic Information */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Academic Information</CardTitle>
                            {/* <Button variant="ghost" size="sm" className="text-slate-400 font-normal hover:bg-transparent">
                                <Edit2 size={14} className="mr-1" /> Edit
                            </Button> */}
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {academicInfo.map((info, idx) => (
                                <div key={idx}>
                                    <p className="text-xs text-slate-400 mb-1">{info.label}</p>
                                    <p className="text-sm font-medium">{info.value}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 4. Professional Interests */}
                    {/* <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Professional Interests</CardTitle>
                            <Button variant="ghost" size="sm" className="text-slate-400 font-normal hover:bg-transparent">
                                <Edit2 size={14} className="mr-1" /> Edit
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs text-slate-400 mb-2">Internship Interests</p>
                                    <p className="text-sm font-medium">Frontend Engineering, Full-stack Development</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-2">Preferred Industries</p>
                                    <p className="text-sm font-medium">Technology, FinTech, E-commerce</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Career Goals</p>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    I am passionate about building scalable web applications. Looking for opportunities to work in a fast-paced environment.
                                </p>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* 5. Skills */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Skills & Interests</CardTitle>
                            {/* <Plus size={18} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {(user?.profile?.skills?.length ? user.profile.skills : ['No skills added']).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 font-normal">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Social Links */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Social Links</CardTitle>
                            {/* <Button variant="ghost" size="sm" className="text-slate-400 font-normal hover:bg-transparent"><Edit2 size={14} className="mr-1" /> Edit</Button> */}
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {socialLinks.map((link, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                    <span className={link.color}>{link.icon}</span>
                                    <span className="flex-1 truncate">{link.label || "N/A"}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* 7. Account Settings */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 px-2">
                            {accountSettings.map((setting, idx) => (
                                <Link key={idx} href='/alumni/settings'>
                                    <Button  variant="ghost" className="cursor-pointer w-full justify-between font-normal text-slate-700 h-10 hover:bg-slate-50">
                                        <span className="flex items-center gap-3">
                                            <span className="text-slate-400">{setting.icon}</span>
                                            {setting.label}
                                        </span>
                                        <ChevronRight size={16} className="text-slate-400" />
                                    </Button>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AlumniProfile;