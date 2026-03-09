"use client";

import { useState } from "react";
import { Pagination } from "antd";
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


const ALL_FEEDBACK: FeedbackItem[] = [
  {
    id: 1,
    name: "Michael Chen",
    email: "m.chen@example.com",
    category: "Suggestion",
    message:
      "The new job board feature is great, but it would be helpful to have a filter for remote positions only.",
    date: "Oct 24, 2023",
    status: "Pending",
    avatar:
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FEuropean%2F2",
  },
  {
    id: 2,
    name: "Aisha Diallo",
    email: "aisha.d@example.com",
    category: "Complaint",
    message:
      "I am unable to update my graduation year in my profile settings. It keeps reverting to the old year after I click save.",
    date: "Oct 23, 2023",
    status: "Pending",
    avatar:
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F18-25%2FAfrican%2F1",
  },
  {
    id: 3,
    name: "John Doe",
    email: "johndoe@example.com",
    category: "Feature Request",
    message:
      "Could we add a mentorship program directory to connect recent graduates with experienced alumni in their field?",
    date: "Oct 21, 2023",
    status: "Reviewed",
    initials: "JD",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    email: "carlos.r@alumni.edu",
    category: "General Feedback",
    message:
      "Thank you for organizing the 20th anniversary reunion event. The new venue was fantastic and the registration process was very smooth.",
    date: "Oct 19, 2023",
    status: "Resolved",
    avatar:
      "https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FHispanic%2F3",
  },
  {
    id: 5,
    name: "Emily Wong",
    email: "ewong@example.com",
    category: "Suggestion",
    message:
      "It would be nice to have a mobile app version of the alumni portal for easier access on the go.",
    date: "Oct 18, 2023",
    status: "Resolved",
    avatar:
      "https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-50%2FEast%20Asian%2F2",
  },
  {
    id: 6,
    name: "Daniel Park",
    email: "d.park@example.com",
    category: "Complaint",
    message:
      "The event registration page crashes on Safari. I've tried multiple times and cannot complete my registration.",
    date: "Oct 17, 2023",
    status: "Pending",
    initials: "DP",
  },
  {
    id: 7,
    name: "Fatima Hassan",
    email: "fatima.h@alumni.edu",
    category: "Suggestion",
    message:
      "Please add more networking event options for alumni based in Asia. The current events are mostly US-centric.",
    date: "Oct 15, 2023",
    status: "Reviewed",
    initials: "FH",
  },
];

const StatusBadge = ({ status }: {status: FeedbackStatus }) => {
  const variants: Record<
    FeedbackStatus,
    { label: string; className: string }
  > = {
    Pending: {
      label: "Pending",
      className:
        "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50",
    },
    Reviewed: {
      label: "Reviewed",
      className:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-50",
    },
    Resolved: {
      label: "Resolved",
      className:
        "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
    },
  };

  const { label, className } = variants[status];
  return (
    <Badge className={`${className} font-semibold text-xs px-3 py-1 rounded-full`}>
      {label}
    </Badge>
  );
}

function AvatarCell({ item }: { item: FeedbackItem }) {
  return (
    <div className="flex items-center gap-3">
      {item.avatar ? (
        <img
          src={item.avatar}
          alt={item.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-semibold">
          {item.initials}
        </div>
      )}
      <span className="font-medium text-slate-800 whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
}

const SummaryCards = () => {
  const cards = [
    {
      value: "1,248",
      label: "Total Feedback Received",
      icon: <MessageSquare size={22} />,
      bg: "bg-blue-600",
    },
    {
      value: "42",
      label: "Pending Reviews",
      icon: <Clock size={22} />,
      bg: "bg-amber-500",
    },
    {
      value: "1,106",
      label: "Resolved Feedback",
      icon: <CheckCircle size={22} />,
      bg: "bg-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
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
  );
}

// Main Component 
const AdminFeedback = () =>  {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<FeedbackItem[]>(ALL_FEEDBACK);
  const PAGE_SIZE = 5;

  const handleDelete = (id: number) =>
    setData((prev) => prev.filter((item) => item.id !== id));


  const categories = [
    "all",
    ...Array.from(new Set(ALL_FEEDBACK.map((f) => f.category))),
  ];

  return (
    <div className="flex flex-col gap-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">
          Feedback Management
        </h1>
        <p className="text-sm text-slate-500">
          View and manage feedback submitted by alumni and users
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

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

          <div className="flex items-center gap-3">
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    No feedback found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={item.id}
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
                      {item.date}
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <StatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="px-2 py-4">
                      <div className="flex items-center gap-4">
                        <button
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={17} />
                        </button>
                        {/* Mark resolved */}
                        <button
                          onClick={() => alert(item.id)}
                          disabled={item.status !== "Pending"}
                          className={`transition-colors ${
                            item.status === "Pending"
                              ? "text-slate-400 hover:text-emerald-600"
                              : "text-slate-200 cursor-not-allowed"
                          }`}
                          title="Mark as resolved"
                        >
                          <Check size={17} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <span className="text-sm text-slate-500">
            Showing{" "}
            {data.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(currentPage * PAGE_SIZE, data.length)} of{" "}
            {data.length} entries
          </span>
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={data.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminFeedback