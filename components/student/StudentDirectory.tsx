"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Empty, Pagination, Skeleton } from 'antd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { GraduationCap, MessageSquare, Calendar, MapPin, Search, Building, SlidersHorizontal } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import Link from "next/link";

// ─── Alumni Card ──────────────────────────────────────────────────────────────

function AlumniCard({ alumni }: { alumni: any }) {
    return (
        <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col gap-0">
                {/* Top — Avatar + Name row */}
                <div className="flex items-center gap-4 pb-4">
                    <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                        <AvatarImage src={alumni.image} alt={alumni.name} />
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                            {alumni.fullname
                                .split(" ")
                                .map((n : any) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="font-bold text-[15px] text-slate-900 truncate leading-snug">
                            {alumni.fullname}
                        </p>
                        <p className="text-[13px] text-slate-500 truncate mt-0.5">{alumni.job}</p>
                        <p className="text-[13px] text-blue-600 font-semibold truncate">
                            @ { alumni.profile.company}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Meta Info */}
                <div className="flex flex-col gap-2.5 mb-4">
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <GraduationCap size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.branch}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <Calendar size={13} className="flex-shrink-0 text-slate-400" />
                        <span>Batch of {alumni.batch}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <MapPin size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.address.city || "not updated"} { alumni.address.state}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {alumni.profile.skills && alumni.profile.skills.map((item : any, index : number) => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="text-[12px] font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full px-3 py-0.5 border-0"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>

                {/* Action Buttons */}
               <div className="w-full">
                    <Link href={`/student/alumni-profile/${alumni._id}`}>
                    <Button
                        variant="outline"
                        className="w-full text-[15px] h-9 border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 cursor-pointer my-2"
                    >
                        View Profile
                    </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniDirectory() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ pageSize, setPageSize] = useState(12)
    const [ sortOrder, setSortOrder] = useState('newest')
    const [ branch , setBranch] = useState("all")
    const [batch, setBatch] = useState("all")
    const { data: SwrData, isLoading, error } = useSWR( 
        `/api/alumni?page=${currentPage}&limit=${pageSize}&branch=${branch}&batch=${batch}&sort=${sortOrder}`,
         fetcher,
        { keepPreviousData: true }
        )

    if (isLoading) return <Skeleton active />
    if (error) return <ErrorState />

    const data = SwrData?.data || []

    const total = SwrData?.pagination.total || 10

    console.log(data)

    return (
        <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
            <main className="flex-1 px-3 md:px-6 py-3 md:py-6 flex flex-col gap-6">

                {/* ── Page Header ── */}
                <div>
                    <h1 className="text-xl md:text-[22px] font-bold text-slate-900 mb-1">
                        Alumni Directory
                    </h1>
                    <p className="text-slate-400 text-[14px]">
                        Connect with alumni from your institution
                    </p>
                </div>

                {/* ── Filter Bar ── */}
                <div className="border border-slate-200 rounded-xl px-3 md:px-4 py-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 bg-white shadow-sm">
                    {/* Search */}
                    <div className="w-full sm:flex-1 sm:min-w-[220px] flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white">
                        <Search size={14} className="text-slate-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name, company, or skill..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="bg-transparent border-none outline-none text-[13px] text-slate-700 placeholder:text-slate-400 w-full"
                        />
                    </div>

                    {/* Department */}
                    <Select onValueChange={(value) => setBranch(value)}>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[130px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Building size={13} className="text-slate-400" />
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">all</SelectItem>
                            <SelectItem value="Computer Science & Engineering">Computer Science</SelectItem>
                            <SelectItem value="Computer Science & Engineering(Cyber Security)">Computer Science & Engineering(Cyber Security)</SelectItem>
                            <SelectItem value="Civil Engineerin">Civil Engineerin</SelectItem>
                            <SelectItem value="VLSI">VLSI</SelectItem>
                            <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Batch Year */}
                    <Select onValueChange={(value) => setBatch(value)}>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[120px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Calendar size={13} className="text-slate-400" />
                            <SelectValue placeholder="Batch Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">all</SelectItem>
                            {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Location for the future improvements
                    <Select>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[110px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <MapPin size={13} className="text-slate-400" />
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="eu">Europe</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="me">Middle East</SelectItem>
                        </SelectContent>
                    </Select> */}

                    <Separator orientation="vertical" className="h-5 mx-0.5" />

                    {/* Sort */}
                    <Select
                    value={sortOrder}
                    onValueChange={(v) => {
                        setSortOrder(v);
                        setCurrentPage(1);
                    }}
                    >
                    <SelectTrigger className="w-36 text-sm border-slate-200">
                        <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                {data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                        {data && data.map((item : any ) => (
                            <AlumniCard key={item._id} alumni={item} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
                        <Empty />
                    </div>
                )}

                {/* ── Pagination ── */}
                    <div className="flex items-center justify-end">
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={(current, size) => {
                                setPageSize(size);
                                setCurrentPage(1); // Reset to first page to avoid "empty page" bugs
                            }}
                            onChange={(page) => setCurrentPage(page)}
                            current={currentPage}
                            pageSize={pageSize} // It is safer to explicitly pass this
                            total={total}
                        />
                    </div>
            </main>
        </div>
    );
}
