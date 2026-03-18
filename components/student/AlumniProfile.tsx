"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, GraduationCap, Building, Briefcase, User, Compass, Award, Link2, Mail, Github, Globe, Linkedin, UserPlus, MessageSquare,CheckCircle2,BookOpen, Building2, TwitterIcon, Clock, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ErrorState from "../shared/Errorstate";
import {  message, Skeleton } from "antd";
import { fetcher } from "@/utils/fetcher";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import clientCatchError from "@/utils/clientCatchError";
import axios from "axios";
import { useEffect, useState } from "react";

interface IConnection {
  _id: string;
  sender: string;
  receiver: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

// In your component state or props:



export default function AlumniProfilePage() {
  const router = useRouter();
  const pathname = usePathname()
  const { data: session, status, update } = useSession()
  const userId = session?.user.id
  const alumniId = pathname.split('/').pop()
  const [connection, setConnection] = useState<IConnection | null>(null);
  const [connectionButton, setConnectionButton] = useState(false)

  const { data , error, isLoading } = useSWR(`/api/admin/users/${alumniId}`, fetcher)
  const { data : connectionData } = useSWR(`/api/connection/${alumniId}`, fetcher)


  useEffect(()=>{
    if(connectionData)
      setConnection(connectionData)

    console.log(connectionData)
  },[connectionData])


  if(error)
    return <ErrorState/>

  if(isLoading)
    return <Skeleton active/>

  const profile = data?.user

  const handleConnection = async (id: string) => {
    try 
    {
      setConnectionButton(true)
      const payload = {
        receiverId : id
      }

      await axios.post('/api/connection', payload)

      message.success("connection request is sent!")
    }
    catch(err)
    {
      return clientCatchError(err)
    }
    finally {
      setConnectionButton(false)
    }
  }

  const handleAccept = ( id : string) => {
    alert(id)
  }
  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="px-8 py-6 flex flex-col gap-6 max-w-[1200px] mx-auto w-full">

        {/* ── Back Link ── */}
        <Link href="/student/directory">
        <button
          className=" cursor-pointer flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-800 transition-colors w-fit"
        >
          <ArrowLeft size={15} />
          Back to Directory
        </button>
        </Link>

        {/* ══════════════════════════════════════════
            PROFILE HEADER CARD
        ══════════════════════════════════════════ */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-6 sm:px-8 sm:py-7">
          {/* On mobile: stack vertically. On desktop: single row */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">

            {/* Top row on mobile: avatar + buttons side by side */}
            <div className="flex items-start justify-between sm:contents gap-4">

              {/* Avatar */}
              <Avatar className="w-28 h-28 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                  <AvatarImage src={profile.image} alt={profile.fullname} />
                  <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                      {profile.fullname
                          .split(" ")
                          .map((n : any) => n[0])
                          .join("")}
                  </AvatarFallback>
              </Avatar>
              
              {/* Buttons — show beside avatar on mobile, top-right on desktop */}
              <div className="flex items-center gap-2 sm:hidden">
                {
                  connection ? 
                  <button 
                  className="cursor-pointer flex items-center gap-1.5 px-3 h-9 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap"
                  onClick={() => handleConnection(profile._id)}
                  >
                    <UserPlus size={14} />
                    Connect
                  </button>
                  : 
                  <Link href="/student/chat">
                  <button className="cursor-pointer flex items-center gap-1.5 px-3 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-semibold text-white transition-colors whitespace-nowrap">
                    <MessageSquare size={14} />
                    Message
                  </button>
                  </Link>
                }
              </div>
            </div>

            {/* Name + headline + meta */}
            <div className="flex-1 min-w-0 sm:pt-1">
              {/* Name + badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[22px] sm:text-[28px] font-bold text-slate-900 leading-tight">
                  {profile.fullname}
                </h1>
                {profile.isActive === "approved" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-50  text-blue-400 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap">
                    <CheckCircle2 size={12} />
                    Verified Alumni
                  </span>
                )}
              </div>

              {/* Headline */}
              <p className="text-[14px] sm:text-[16px] text-slate-500 font-normal mt-1.5">
                {profile.profile.headline}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <MapPin size={14} className="text-slate-400" />
                  {profile.address.city } { profile.address.state}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <GraduationCap size={14} className="text-slate-400" />
                  {profile.batch} • {profile.branch}
                </span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500">
                  <Building size={14} className="text-slate-400" />
                  {profile.profile.company}
                </span>
              </div>
            </div>

            {/* Buttons — hidden on mobile (shown above), visible on desktop */}
            <div className="hidden md:flex items-center my-auto gap-3 flex-shrink-0">
              {!connection ? (
                <button 
                  className="flex items-center gap-1.5 px-8 py-4 border border-slate-200 rounded-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => handleConnection(profile._id)}
                >
                  <UserPlus size={14} /> Connect
                </button>
              ) : connection.status === "pending" ? (
                connection.sender === userId ? (
                  <button 
                    disabled 
                    className="flex items-center gap-1.5 px-8 py-4 border border-slate-200 rounded-lg font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"
                  >
                    <Clock size={14} /> Requested
                  </button>
                ) : (

                  <button 
                    className="flex items-center gap-1.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors"
                    onClick={() => handleAccept(connection._id)}
                  >
                    <Check size={14} /> Accept
                  </button>
                )
              ) : connection.status === "approved" ? (
                // APPROVED: Show Message 
                <Link href="/student/chat">
                  <button className="flex items-center gap-1.5 px-3 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-semibold text-white">
                    <MessageSquare size={14} /> Message
                  </button>
                </Link>
              ) : <button 
                  className="flex items-center gap-1.5 px-8 py-4 border border-slate-200 rounded-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => handleConnection(profile._id)}
                >
                  <UserPlus size={14} /> Connect
                </button>
                } 

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TWO COLUMN GRID
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* About */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <User size={17} className="text-slate-400" />
                About
              </div>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Briefcase size={17} className="text-slate-400" />
                Experience
              </div>
              <div className="flex flex-col gap-6">
                { data && data.experience.map((exp : any, i : number) => (
                  <div key={i} className="flex gap-4">
                    {/* Icon box */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        exp.current ? "bg-blue-50" : "bg-slate-100"
                      }`}
                    >
                      <Building2
                        size={22}
                        className={exp.current ? "text-blue-500" : "text-slate-400"}
                      />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="font-semibold text-[16px] text-slate-900 leading-snug">
                        {exp.designation}
                      </p>
                      <p className="text-[14px] text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-[13px] text-slate-400 mt-0.5">{exp.starting} - {exp.completion} </p>
                      <p className="text-[14px] text-slate-600 leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <GraduationCap size={17} className="text-slate-400" />
                Education
              </div>
              <div className="flex flex-col gap-6">
                {data && data.education.map((edu : any, i : number) => (
                  <div key={i} className="flex gap-4">
                    {/* Icon box */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={22} className="text-blue-500" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="font-semibold text-[16px] text-slate-900 leading-snug">
                        {edu.degreeName}
                      </p>
                      <p className="text-[14px] text-blue-600 font-medium">
                        {edu.universityName}
                      </p>
                      <p className="text-[13px] text-slate-400 mt-0.5">{edu.completionYear}</p>
                      <p className="text-[14px] text-slate-600 leading-relaxed mt-1">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Mentorship */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Compass size={17} className="text-slate-400" />
                Mentorship
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                {profile.profile.mentorship}
              </p>
              <button className=" cursor-pointer w-full flex items-center justify-center h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-semibold text-white transition-colors">
                Request Mentorship
              </button>
            </div>

            {/* Skills */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Award size={17} className="text-slate-400" />
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.profile.skills && profile.profile.skills.map((skill : any) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[13px] font-medium hover:bg-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Links */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Link2 size={17} className="text-slate-400" />
                Contact &amp; Links
              </div>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 truncate">
                    {profile.email}
                  </span>
                </div>
                {/* LinkedIn */}
                <a
                  href={`https://${profile.socialLinks && profile.socialLinks.linkedIn}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Linkedin size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.socialLinks && profile.socialLinks.linkedIn}
                  </span>
                </a>
                {/* GitHub */}
                <a
                  href={`https://${profile.socialLinks && profile.socialLinks.github}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Github size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.socialLinks && profile.socialLinks.github}
                  </span>
                </a>
                {/* Website */}
                <a
                  href={`https://${profile.socialLinks && profile.socialLinks.twitter}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <TwitterIcon size={15} className="text-slate-500" />
                  </div>
                  <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">
                    {profile.socialLinks && profile.socialLinks.twitter}
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}