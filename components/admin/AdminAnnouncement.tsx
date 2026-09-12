"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import DOMPurify from "dompurify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Input,
  Tag,
  Space,
  Tooltip,
  Pagination,
  Empty,
  message,
  Skeleton,
  Popconfirm,
} from "antd";

import { AnnouncementModal } from "./AdminAddEditAnnouncementModel";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import clientCatchError from "@/utils/clientCatchError";
import moment from "moment";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ page , setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)

  const { data , error, isLoading} = useSWR(`/api/announcement?page=${page}&limit=${pageSize}`, fetcher)
  useEffect(() => {
    if(data)
    {
        setAnnouncements(data.announcements)
    }
  }, [data]);

  if(error)
    return <ErrorState />

  if(isLoading)
    return <Skeleton />

  console.log(data)

  const handleSubmit = async (values: any) => {
    try {
      if (selectedAnnouncement) {
        await axios.put(
          `/api/announcement/${selectedAnnouncement._id}`,
          values
        );
        message.success("Announcement updated");
      } else {
        await axios.post("/api/announcement", values);
        message.success("Announcement created");
      }
      mutate(`/api/announcement?page=${page}&limit=${pageSize}`)
      setModalOpen(false);
      setSelectedAnnouncement(null);
    } catch (err) {
      clientCatchError(err)
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/announcement/${id}`);
      mutate(`/api/announcement?page=${page}&limit=${pageSize}`);
      message.success("Deleted successfully");
    } catch (err){
      clientCatchError(err)
    }
  }

  const handleChange = (page : number, pageSize : number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manage Announcements
          </h1>
          <p className="text-sm text-slate-500">
            View, create, and edit announcements for the alumni portal.
          </p>
        </div>

        <Button
          className="bg-[#0b6ff0] hover:bg-[#0856ba] text-white flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSelectedAnnouncement(null);
            setModalOpen(true);
          }}
        >
          <Plus size={18} /> Create Announcement
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search announcements..."
          prefix={
            <Search
              size={16}
              className="text-slate-400"
            />
          }
          className="max-w-sm h-10 rounded-md border-slate-200"
          allowClear
        />
      </div>

      {/* Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[45%] py-4 px-4">
                  Title
                </TableHead>
                <TableHead className="w-[20%]">
                  Date Posted
                </TableHead>
                <TableHead className="w-[15%]">
                  Status
                </TableHead>
                <TableHead className="w-[20%] text-right pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {announcements.length > 0 ? (
                announcements.map((item) => (
                  <TableRow
                    key={item._id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    <TableCell className="py-4 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">
                          {item.title}
                        </span>
                        <div 
                          className="text-sm leading-relaxed text-slate-600 max-w-[95%]"
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-slate-600 text-sm" >
                      {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </TableCell>

                    <TableCell>
                      {item.newAnnouncement ? (
                        <Tag
                          color="success"
                          className="rounded-full px-3 border-none font-medium"
                        >
                          New
                        </Tag>
                      ) : (
                        <Tag
                          color="default"
                          className="rounded-full px-3 border-none font-medium bg-slate-100"
                        >
                          Old
                        </Tag>
                      )}
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Space size="small">
                        <Tooltip title="Edit">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-500"
                            onClick={() => {
                              setSelectedAnnouncement(
                                item
                              );
                              setModalOpen(true);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                        </Tooltip>
                        
                        <Popconfirm
                          title="Delete Event"
                          description="Are you sure you want to delete this event?"
                          onConfirm={() =>
                              handleDelete(item._id)}
                          okText="Yes"
                          cancelText="No"
                        >
                            <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"

                          >
                            <Trash2 size={16} />
                          </Button>

                        </Popconfirm>
                      </Space>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center"
                  >
                    <Empty description="No announcements found" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-white border-t border-slate-100">
            <span className="text-sm text-slate-500 font-medium">
              Showing {announcements.length} results
            </span>
            <Pagination
              size="small"
              total={data.total}
              pageSize={pageSize}
              showSizeChanger={true}
              className="custom-pagination"
              onChange={handleChange}
              current={page}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <AnnouncementModal
        open={modalOpen}
        setOpen={setModalOpen}
        initialData={selectedAnnouncement}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminAnnouncements;