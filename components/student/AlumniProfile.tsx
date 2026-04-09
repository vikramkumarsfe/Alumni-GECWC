"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";
import Link from "next/link";
import axios from "axios";
// Added Empty here
import { message, Skeleton, Empty } from "antd";
import { 
  ArrowLeft, MapPin, GraduationCap, Building, Briefcase, 
  User, Compass, Award, Link2, Mail, Github, Linkedin, 
  UserPlus, MessageSquare, CheckCircle2, BookOpen, 
  Building2, TwitterIcon, Clock, Check, Zap 
} from "lucide-react";

import { fetcher } from "@/utils/fetcher";
import clientCatchError from "@/utils/clientCatchError";
import ErrorState from "../shared/Errorstate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AlumniProfilePage() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userId = session?.user.id;
  const alumniId = pathname.split('/').pop();

  const [connection, setConnection] = useState<any>(null);
  const [mentorship, setMentorship] = useState<any>(null);

  const { data, error, isLoading } = useSWR(`/api/admin/users/${alumniId}`, fetcher);
  const { data: connectionData } = useSWR(`/api/connection/${alumniId}`, fetcher);
  const { data: mentorshipData } = useSWR(`/api/mentorship/${alumniId}`, fetcher);

  useEffect(() => {
    if (connectionData) setConnection(connectionData);
    if (mentorshipData) setMentorship(mentorshipData);
  }, [connectionData, mentorshipData]);

  if (error) return <ErrorState />;
  if (isLoading) return <div className="p-10"><Skeleton active /></div>;

  const profile = data?.user;

  const handleAction = async (method: 'post' | 'put' | 'delete', url: string, payload: any, successMsg: string, isMentorship = false) => {
    try {
      if (method === 'post') await axios.post(url, payload);
      else if (method === 'put') await axios.put(url, payload);
      else if (method === 'delete') await axios.delete(url);

      message.success(successMsg);

        // 2. Send notification ONLY for connection request
      if (method === "post" && url === "/api/connection") {
        if (profile?.FCM) {
          const payload = {
            token: profile.FCM,
          }
          await axios.post("/api/send-notification",payload );
        }
      }
      
      mutate(isMentorship ? `/api/mentorship/${alumniId}` : `/api/connection/${alumniId}`);
    } catch (err) {
      return clientCatchError(err);
    }
  };

  const sections = [
    { title: "Experience", icon: <Briefcase size={17} className="text-slate-400" />, data: data?.experience, type: 'exp' },
    { title: "Education", icon: <GraduationCap size={17} className="text-slate-400" />, data: data?.education, type: 'edu' }
  ];

  const socialLinks = [
    { icon: <Mail size={15} className="text-slate-500" />, value: profile.email, href: `mailto:${profile.email}`, isExternal: false },
    { icon: <Linkedin size={15} className="text-slate-500" />, value: profile.socialLinks?.linkedIn, href: `https://${profile.socialLinks?.linkedIn}`, isExternal: true },
    { icon: <Github size={15} className="text-slate-500" />, value: profile.socialLinks?.github, href: `https://${profile.socialLinks?.github}`, isExternal: true },
    { icon: <TwitterIcon size={15} className="text-slate-500" />, value: profile.socialLinks?.twitter, href: `https://${profile.socialLinks?.twitter}`, isExternal: true },
  ].filter(link => link.value);

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      <div className="flex flex-col gap-3 max-w-[1200px] mx-auto w-full p-2">
        
        <Link href="/student/directory">
          <button className="cursor-pointer flex items-center gap-2 text-[14px] font-medium text-slate-500 hover:text-slate-800 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to Directory
          </button>
        </Link>

        {/* PROFILE HEADER CARD */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-4 py-6 sm:px-8 sm:py-7">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
            <div className="flex items-start justify-between sm:contents gap-4">
              <Avatar className="w-28 h-28 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                <AvatarImage src={profile.image} alt={profile.fullname} />
                <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                  {profile.fullname.split(" ").map((n: any) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center gap-2 sm:hidden pt-3">
                <button 
                  className="cursor-pointer flex items-center gap-1.5 px-3 h-9 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors whitespace-nowrap"
                  onClick={() => handleAction('post', '/api/connection', { receiverId: profile._id }, "connection request is sent!")}
                >
                  <UserPlus size={14} /> Connect
                </button>
              </div>
            </div>

            <div className="flex-1 min-w-0 sm:pt-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-[22px] sm:text-[28px] font-bold text-slate-900 leading-tight">{profile.fullname}</h1>
                {profile.isActive === "approved" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-50 text-blue-400 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap">
                    <CheckCircle2 size={12} />{ profile.role === "alumni" ?  "Verified Alumni" : "Verified Student"}
                  </span>
                )}
              </div>
              <p className="text-[14px] sm:text-[16px] text-slate-500 font-normal mt-1.5">{profile.profile.headline}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500"><MapPin size={14} className="text-slate-400" /> {profile.address.city} {profile.address.state}</span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500"><GraduationCap size={14} className="text-slate-400" /> {profile.batch} • {profile.branch}</span>
                <span className="flex items-center gap-1.5 text-[13px] sm:text-[14px] text-slate-500"><Building size={14} className="text-slate-400" /> {profile.profile.company}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center my-auto gap-3 flex-shrink-0">
               {!connection ? (
                <button className="cursor-pointer flex items-center gap-1.5 px-8 py-4 border border-slate-200 rounded-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors" onClick={() => handleAction('post', '/api/connection', { receiverId: profile._id }, "connection request is sent!")}><UserPlus size={14} /> Connect</button>
              ) : connection.status === "pending" ? (
                connection.sender === userId ? (
                  <button disabled className="flex items-center gap-1.5 px-8 py-4 border border-slate-200 rounded-lg font-semibold text-slate-400 bg-slate-50 cursor-not-allowed"><Clock size={14} /> Requested</button>
                ) : (
                  <button className="cursor-pointer flex items-center gap-1.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors" onClick={() => handleAction('put', `/api/connection/${connection._id}`, { status: "approved" }, "accepted")}><Check size={14} /> Accept</button>
                )
              ) : (
                <Link href="/student/chat"><button className="cursor-pointer flex items-center gap-1.5 px-3 h-9 bg-blue-600 hover:bg-blue-700 rounded-lg text-[13px] font-semibold text-white"><MessageSquare size={14} /> Message</button></Link>
              )}
            </div>
          </div>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3 items-start">
          <div className="flex flex-col gap-3">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <User size={17} className="text-slate-400" /> About
              </div>
              {profile.bio ? (
                <p className="text-[15px] text-slate-600 leading-relaxed">{profile.bio}</p>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No bio available" />
              )}
            </div>

            {sections.map((section, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                  {section.icon} {section.title}
                </div>
                <div className="flex flex-col gap-3">
                  {section.data && section.data.length > 0 ? (
                    section.data.map((item: any, i: number) => (
                      <div key={i} className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${section.type === 'exp' && item.current ? "bg-blue-50" : "bg-slate-100"}`}>
                          {section.type === 'exp' ? <Building2 size={22} className={item.current ? "text-blue-500" : "text-slate-400"} /> : <BookOpen size={22} className="text-slate-400" />}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <p className="font-semibold text-[16px] text-slate-900 leading-snug">{section.type === 'exp' ? item.designation : item.degreeName}</p>
                          <p className="text-[14px] text-blue-600 font-medium">{section.type === 'exp' ? item.company : item.universityName}</p>
                          <p className="text-[13px] text-slate-400 mt-0.5">{section.type === 'exp' ? `${item.starting} - ${item.completion}` : item.completionYear}</p>
                          <p className="text-[14px] text-slate-600 leading-relaxed mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={`No ${section.title.toLowerCase()} added`} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Compass size={17} className="text-slate-400" /> Mentorship
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">{profile.profile.mentorship || "No mentorship details provided."}</p>
              {!mentorship ? (
                <button className="cursor-pointer w-full flex items-center justify-center h-11 bg-blue-600 hover:bg-blue-700 rounded-lg text-[14px] font-semibold text-white transition-colors" onClick={() => message.info("we are continuously working.")}>Request Mentorship</button>
              ) : (
                <div className="w-full flex items-center justify-center h-11 bg-blue-50 border border-blue-200 rounded-lg text-[14px] font-semibold text-blue-700 cursor-pointer" onClick={() => message.info("we are continuously working.")}><Zap size={16} className="mr-2 text-blue-500" /> Active Mentorship</div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Award size={17} className="text-slate-400" /> Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.profile.skills && profile.profile.skills.length > 0 ? (
                  profile.profile.skills.map((skill: any) => (
                    <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[13px] font-medium hover:bg-slate-200 transition-colors">{skill}</span>
                  ))
                ) : (
                  <div className="w-full py-2">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No skills listed" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 text-[17px] font-semibold text-slate-900 border-b border-slate-100 pb-4 mb-5">
                <Link2 size={17} className="text-slate-400" /> Contact &amp; Links
              </div>
              <div className="flex flex-col gap-4">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link, i) => (
                    <a key={i} href={link.href} className="flex items-center gap-3 group" target={link.isExternal ? "_blank" : undefined}>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">{link.icon}</div>
                      <span className="text-[14px] text-slate-700 group-hover:text-blue-600 transition-colors truncate">{link.value}</span>
                    </a>
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No contact links" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}