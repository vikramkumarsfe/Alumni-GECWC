"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
    GraduationCap, MapPin, Building2, Calendar,
    Mail, Phone, Edit2, Camera, Linkedin, Github, 
    Globe, Twitter, Lock, Shield, Bell, ChevronRight, Plus
} from 'lucide-react';

const StudentProfile = () => {
    return (
        <div className="max-w-7xl mx-auto p-8 space-y-6 bg-[#f8fafc]">

            {/* 1. Header Hero Section */}
            <Card className="overflow-hidden border border-slate-200 shadow-sm">
                <div className="h-32 bg-[#4285F4] -mt-10" />
                <CardContent className="relative pt-0 px-8 pb-8">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
                        <div className="relative group">
                            <Image
                                src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F18-25%2FSouth%20Asian%2F1"
                                alt="Alex Sharma"
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                            />
                        </div>

                        <div className="flex-1 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold flex items-center gap-3">
                                        Alex Sharma
                                        <div className="h-6 w-12 bg-blue-600 rounded-full" /> {/* Representing the blue status bar */}
                                    </h1>
                                    <p className="text-slate-600 mt-1">Final Year B.Tech Student | Aspiring Software Engineer</p>
                                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Building2 size={16} /> Computer Science Department</span>
                                        <span className="flex items-center gap-1"><Calendar size={16} /> Class of 2024</span>
                                        <span className="flex items-center gap-1"><MapPin size={16} /> San Francisco, CA</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="text-slate-600">Upload Picture</Button>
                                    <Button className="bg-blue-600 hover:bg-blue-700">Edit Profile</Button>
                                </div>
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
                            <Button variant="ghost" size="sm" className="text-slate-400 font-normal"><Edit2 size={14} className="mr-1" /> Edit</Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Full Name</p>
                                <p className="text-sm font-medium">Alex Sharma</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Email Address</p>
                                <p className="text-sm font-medium">alex.sharma@university.edu</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Phone Number</p>
                                <p className="text-sm font-medium">+1 (555) 123-4567</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Gender</p>
                                <p className="text-sm font-medium">Male</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Date of Birth</p>
                                <p className="text-sm font-medium">August 14, 2002</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Address</p>
                                <p className="text-sm font-medium">123 Campus Drive, Apt 4B, SF, CA</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Academic Information */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Academic Information</CardTitle>
                            <Button variant="ghost" size="sm" className="text-slate-400 font-normal"><Edit2 size={14} className="mr-1" /> Edit</Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">College/University</p>
                                <p className="text-sm font-medium">State University of Technology</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Degree</p>
                                <p className="text-sm font-medium">Bachelor of Technology (B.Tech)</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Department</p>
                                <p className="text-sm font-medium">Computer Science and Engineering</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Expected Graduation Year</p>
                                <p className="text-sm font-medium">2024</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Batch Year</p>
                                <p className="text-sm font-medium">2020-2024</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Student ID / Roll No.</p>
                                <p className="text-sm font-medium">CS2020-0451</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 4. Professional Interests */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Professional Interests & Career Goals</CardTitle>
                            <Button variant="ghost" size="sm" className="text-slate-400 font-normal"><Edit2 size={14} className="mr-1" /> Edit</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs text-slate-400 mb-2">Internship Interests</p>
                                    <p className="text-sm font-medium">Frontend Engineering, Full-stack Development, UI/UX</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-2">Preferred Industries</p>
                                    <p className="text-sm font-medium">Technology, FinTech, E-commerce</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 mb-1">Career Goals</p>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    I am passionate about building scalable web applications and enhancing user experiences. Looking for opportunities to work in a fast-paced environment where I can contribute to meaningful projects and learn from experienced engineers.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                    
                    {/* 5. Skills & Interests */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Skills & Interests</CardTitle>
                            <Plus size={18} className="text-slate-400 cursor-pointer" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {['Web Development', 'React.js', 'Data Structures', 'UI/UX Design', 'Cloud Computing', 'Python'].map((skill) => (
                                    <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 font-normal flex items-center gap-1">
                                        {skill} <span className="text-xs opacity-50">×</span>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Social Links */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold">Social Links</CardTitle>
                            <Button variant="ghost" size="sm" className="text-slate-400 font-normal"><Edit2 size={14} className="mr-1" /> Edit</Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3 p-3 border rounded-lg text-sm text-slate-600">
                                <Linkedin size={18} className="text-slate-400" />
                                <span className="flex-1 truncate">linkedin.com/in/alexsharma</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg text-sm text-slate-600">
                                <Github size={18} className="text-slate-400" />
                                <span className="flex-1 truncate">github.com/alexsharmadev</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg text-sm text-slate-600">
                                <Globe size={18} className="text-slate-400" />
                                <span className="flex-1 truncate">alexsharma.dev</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg text-sm text-slate-600">
                                <Twitter size={18} className="text-slate-400" />
                                <span className="flex-1 truncate">@alexsharma_tech</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 7. Account Settings */}
                    <Card className="border border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 px-2">
                            <Button variant="ghost" className="w-full justify-between font-normal text-slate-700 h-10">
                                <span className="flex items-center gap-3"><Lock size={18} className="text-slate-400" /> Change Password</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between font-normal text-slate-700 h-10">
                                <span className="flex items-center gap-3"><Shield size={18} className="text-slate-400" /> Privacy Settings</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between font-normal text-slate-700 h-10">
                                <span className="flex items-center gap-3"><Bell size={18} className="text-slate-400" /> Email Preferences</span>
                                <ChevronRight size={16} className="text-slate-400" />
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default StudentProfile;