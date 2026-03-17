"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    GraduationCap,
    MessageSquare,
    Calendar,
    MapPin,
    Search,
    Building,
    SlidersHorizontal,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Alumni {
    id: number;
    name: string;
    job: string;
    company: string;
    department: string;
    batch: string;
    location: string;
    skills: string[];
    avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const alumniData: Alumni[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Alumni ${i + 1}`,
  job: "Software Engineer",
  company: "Tech Company",
  department: "Computer Science",
  batch: `Class of ${2015 + (i % 8)}`,
  location: "India",
  skills: ["React", "Node.js", "JavaScript"],
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
}));

// ─── Alumni Card ──────────────────────────────────────────────────────────────

function AlumniCard({ alumni }: { alumni: Alumni }) {
    return (
        <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden">
            <CardContent className="flex flex-col gap-0">
                {/* Top — Avatar + Name row */}
                <div className="flex items-center gap-4 pb-4">
                    <Avatar className="w-14 h-14 rounded-full border border-slate-100 shadow-sm flex-shrink-0">
                        <AvatarImage src={alumni.avatar} alt={alumni.name} />
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-semibold text-base">
                            {alumni.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="font-bold text-[15px] text-slate-900 truncate leading-snug">
                            {alumni.name}
                        </p>
                        <p className="text-[13px] text-slate-500 truncate mt-0.5">{alumni.job}</p>
                        <p className="text-[13px] text-blue-600 font-semibold truncate">
                            @ {alumni.company}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Meta Info */}
                <div className="flex flex-col gap-2.5 mb-4">
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <GraduationCap size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.department}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <Calendar size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.batch}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[13px] text-slate-500">
                        <MapPin size={13} className="flex-shrink-0 text-slate-400" />
                        <span>{alumni.location}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-4" />

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {alumni.skills.map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="text-[12px] font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full px-3 py-0.5 border-0"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>

                {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-2.5">
                    <Button
                        variant="outline"
                        className="flex-1 text-[13px] h-9 border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50"
                    >
                        View Profile
                    </Button>
                    <Button className="flex-1 text-[13px] h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium gap-1.5 rounded-lg shadow-none">
                        <MessageSquare size={13} />
                        Message
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Custom Pagination ────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | "...")[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, "...", total];
    }

    if (current >= total - 2) {
        return [1, "...", total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
}

function CustomPagination({
  current,
  total,
  pageSize,
  onChange,
}: {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {

  const totalPages = Math.ceil(total / pageSize);
  const pages = getPageNumbers(current, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-6">

      {/* Previous */}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex items-center gap-2 px-4 h-9 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-4">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="text-sm text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={`${p}-${i}`}
              onClick={() => onChange(p as number)}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium ${
                current === p
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onChange(Math.min(totalPages, current + 1))}
        disabled={current === totalPages}
        className="flex items-center gap-2 px-4 h-9 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40"
      >
        Next →
      </button>

    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniDirectory() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const filtered = alumniData.filter(
        (a) =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.company.toLowerCase().includes(search.toLowerCase()) ||
            a.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    );

    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
            <main className="flex-1 px-4 md:px-8 py-6 md:py-8 flex flex-col gap-6">

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
                    <Select>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[130px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Building size={13} className="text-slate-400" />
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="it">Information Technology</SelectItem>
                            <SelectItem value="ee">Electronics Eng.</SelectItem>
                            <SelectItem value="se">Software Eng.</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Batch Year */}
                    <Select>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[120px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Calendar size={13} className="text-slate-400" />
                            <SelectValue placeholder="Batch Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {[2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022].map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Location */}
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
                    </Select>

                    <Separator orientation="vertical" className="h-5 mx-0.5" />

                    {/* Sort */}
                    <Button
                        variant="ghost"
                        className="text-[13px] text-slate-500 gap-1.5 px-2.5 h-9 hover:bg-slate-50 font-medium"
                    >
                        <SlidersHorizontal size={13} />
                        Sort: Newest
                    </Button>
                </div>

                {/* ── Alumni Grid ── */}
                {paginated.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                        {paginated.map((alumni) => (
                            <AlumniCard key={alumni.id} alumni={alumni} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-24 text-slate-400 text-sm">
                        No alumni match your search.
                    </div>
                )}

                {/* ── Pagination ── */}
                {filtered.length > 0 && (
                    <CustomPagination
                        current={currentPage}
                        total={filtered.length}
                        pageSize={pageSize}
                        onChange={setCurrentPage}
                    />
                )}

            </main>
        </div>
    );
}