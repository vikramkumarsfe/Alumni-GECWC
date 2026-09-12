"use client";

import { useEffect, useState } from "react";
import { message, Pagination, Skeleton } from "antd";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Check,
  Trash2,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";
import "antd/dist/reset.css";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import moment from "moment";
import axios from "axios";
import clientCatchError from "@/utils/clientCatchError";


const StatusBadge = ({ status }: {status: FeedbackStatus }) => {
  
  return (
    <Badge className={`"bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-semibold text-xs px-3 py-1 rounded-full`}>
      {status}
    </Badge>
  );
}

function AvatarCell({ item }: { item: FeedbackItem }) {
  return (
    <div className="flex items-center gap-3 px-3">
      <span className="font-medium text-slate-800 whitespace-nowrap">
        {item.fullname}
      </span>
    </div>
  );
}

// Main Component 
const AdminFeedback = () =>  {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<FeedbackItem[]>();
  const PAGE_SIZE = 10

  const { data : swrData, error, isLoading } = useSWR( `/api/feedback?status=${statusFilter}&type=${categoryFilter}&sort=${sortOrder}&page=${currentPage}&limit=${PAGE_SIZE}`, fetcher)

  const { data : descriptionData , isLoading : descriptionIsLoading , error : descriptionError} = useSWR( `/api/feedback/description`, fetcher)

  // Instead of let + useEffect, define them right here:
  const cardTotal = descriptionData?.total || 0;
  const cardPending = descriptionData?.pending || 0;
  const cardResolved = descriptionData?.resolved || 0;
  console.log(descriptionData)
  useEffect(()=>{
    if(swrData)
    {
      setData(swrData.data)
    }
  },[swrData])

  if(error)
    return <ErrorState />

  if(isLoading)
    return <Skeleton active/>

  if(descriptionError)
    return <ErrorState />
    
  if(descriptionIsLoading)
    return < Skeleton active />


  const handleDelete = async(id: string) =>
  {
    try {
      await axios.delete(`/api/feedback/${id}`)

      message.success("Feedback deleted Succesfully")
      mutate(`/api/feedback?status=${statusFilter}&type=${categoryFilter}&sort=${sortOrder}&page=${currentPage}&limit=${PAGE_SIZE}`)
      mutate(`/api/feedback/description`)
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }

  const categories = [
    "all",
    ...Array.from(new Set(data?.map((f) => f.category))),
  ]


  

    const cards = [
    {
      value: cardTotal,
      label: "Total Feedback Received",
      icon: <MessageSquare size={22} />,
      bg: "bg-blue-600",
    },
    {
      value: cardPending,
      label: "Pending Reviews",
      icon: <Clock size={22} />,
      bg: "bg-amber-500",
    },
    {
      value:  cardResolved ,
      label: "Resolved Feedback",
      icon: <CheckCircle size={22} />,
      bg: "bg-emerald-500",
    },
  ]

  const handleResolve = async (id: string) => {
    try 
    {
      const data = await axios.put(`/api/feedback/${id}`)

      message.success("Issue is Resolved")
      mutate(`/api/feedback?status=${statusFilter}&type=${categoryFilter}&sort=${sortOrder}&page=${currentPage}&limit=${PAGE_SIZE}`)
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }

  return (
    <div className="flex flex-col gap-6 bg-slate-50 min-h-0">

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Feedback Management
        </h1>
        <p className="text-sm text-slate-500">
          View and manage feedback submitted by alumni and users
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards && cards.map((card) => (
          <Card
            key={card.label}
            className="border border-slate-200 shadow-sm bg-white"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-slate-800">
                  {card.value}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {card.label}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-full ${card.bg} text-white flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-200">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              placeholder="Search by name, email, or message..."
              className="pl-9 text-sm border-slate-200 bg-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="admin-toolbar">
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-36 text-sm border-slate-200">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={categoryFilter}
              onValueChange={(v) => {
                setCategoryFilter(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-44 text-sm border-slate-200">
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "Category: All" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 border-b border-slate-200">
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  User Name
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Email
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Message Preview
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Date Submitted
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No feedback found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data && data.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="px-4 py-4">
                      <AvatarCell item={item} />
                    </TableCell>
                    <TableCell className="px-2 py-4 text-slate-600 text-sm">
                      {item.email}
                    </TableCell>
                    <TableCell className="px-2 py-4 text-slate-600 text-sm whitespace-nowrap">
                      {item.category}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 max-w-[280px]">
                        {item.message}
                      </p>
                    </TableCell>
                    <TableCell className="px-2 py-4 text-slate-600 text-sm whitespace-nowrap">
                      {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                          title="View"
                        >
                          <Eye size={17} />
                        </button>
                        {/* Mark resolved */}
                        <button
                          onClick={() => handleResolve(item._id)}
                          disabled={item.status !== "Pending"}
                          className={`transition-colors  ${
                            item.status === "Pending"
                              ? "text-slate-400 hover:text-emerald-600 cursor-pointer"
                              : "text-slate-200 cursor-not-allowed"
                          }`}
                          title="Mark as resolved"
                        >
                          <Check size={17} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-200">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={swrData.total}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminFeedback