"use client";

import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Empty, Form, Pagination, Skeleton , Button as AntdButton } from 'antd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { GraduationCap, Calendar, MapPin, Search, Building,} from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import { AlumniCard } from "../shared/AlumniCard";

// ─── Alumni Card ──────────────────────────────────────────────────────────────



// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlumniStudentDirectory() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ pageSize, setPageSize] = useState(12)
    const [ sortOrder, setSortOrder] = useState('newest')
    const [ branch , setBranch] = useState("")
    const [batch, setBatch] = useState("")
    const [form] = Form.useForm();
    const { data: SwrData, isLoading, error } = useSWR( 
        `/api/student/directory?page=${currentPage}&limit=${pageSize}&branch=${branch}&batch=${batch}&sort=${sortOrder}&search=${search}`,
        fetcher,
        { keepPreviousData: true }
    )

    if (isLoading) return <Skeleton active />
    if (error) return <ErrorState />

    const data = SwrData?.data || []

    const total = SwrData?.pagination.total || 10

    if (!SwrData && isLoading) return <Skeleton active />

    const handleSearch = (values: any) => {
        if( values.search && values.search.length > 0 )
        {
            console.log("hii")
            setSearch(values.search)
            form.resetFields()
            setCurrentPage(1)
        }
        else
        {
            setSearch("")
        }
    }

    console.log(branch)

    return (
        <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
            <main className="flex-1 px-1 md:px-6 py-3 md:py-6 flex flex-col gap-6">

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
                        
                        <Form 
                            onFinish={handleSearch} 
                            form={form}
                            className="flex justify-between w-full !m-0 !p-0"
                            size="small"
                        >
                            <Form.Item 
                                name="search"
                                className="flex-1 w-full m-0 p-0 "
                                style={{ marginBottom: 0 }}
                            >
                                <input
                                    type="text"
                                    placeholder="Search by name, company, or skill..."
                                    className="bg-transparent border-none outline-none text-[13px] text-slate-700 placeholder:text-slate-400 w-full"
                                />
                            </Form.Item>
                            <AntdButton htmlType="submit">
                                <Search size={14} className="text-slate-400 flex-shrink-0" />
                            </AntdButton>
                        </Form>
                    </div>

                    {/* Department */}
                    <Select onValueChange={(value) => setBranch(value)} value={branch}>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[130px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Building size={13} className="text-slate-400" />
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">all</SelectItem>
                            <SelectItem value="Computer Science & Engineering">Computer Science</SelectItem>
                            <SelectItem value="Computer Science & Engineering(Cyber Security)">Computer Science & Engineering(Cyber Security)</SelectItem>
                            <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                            <SelectItem value="VLSI">VLSI</SelectItem>
                            <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Batch Year */}
                    <Select onValueChange={(value) => setBatch(value)} value={batch}>
                        <SelectTrigger className="w-full sm:w-auto sm:min-w-[120px] border-slate-200 text-[13px] text-slate-600 font-medium h-9 gap-1.5 rounded-lg">
                            <Calendar size={13} className="text-slate-400" />
                            <SelectValue placeholder="Batch Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" >all</SelectItem>
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
