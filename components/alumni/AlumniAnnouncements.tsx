'use client'
import React, { useEffect, useState } from "react";
import { Search, Clock } from "lucide-react";
import { Empty, Pagination, Skeleton } from "antd";
import DOMPurify from "dompurify";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import ErrorState from "../shared/Errorstate";
import moment from 'moment'


const AnnouncementFeed = () => {
  const [ isExpanded, setIsExpanded ] = useState({expanded : false, index : 0})
  const pageSize = 10
  const [page, setPage] = useState(1)
  const { data , isLoading, error } = useSWR(`/api/announcement?page=${page}&limit=${pageSize}`, fetcher)
  const [announcements, setAnnouncements] = useState<any[]>([])

  useEffect(()=>{
    if(data)
    {
      setAnnouncements(data.announcements)
    }
  },[data])


  if(error)
    return <ErrorState />

  if(isLoading)
    return <Skeleton active />

  if(data.announcements.length === 0)
    return (
      <div className="flex item-center justify-center">
        <Empty />
        
      </div>
    )

  const getContent = (content : string, index : number) => {
    if(isExpanded.expanded === true && index === isExpanded.index)
    {
      return content
    }
    return `${content.slice(0,100)}...`
  }
  return (
    <div className="mx-auto space-y-8 p-6 md:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          University Announcements
        </h1>
        <p className="text-slate-500 text-sm">
          Stay updated with the latest news and notices from the administration.
        </p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search announcements by title or keyword..."
          className="h-11 bg-white pl-10 shadow-sm border-slate-200 focus-visible:ring-blue-500"
        />
      </div>
      <div className="grid gap-4">
        {announcements.map((item, index) => (
          <Card key={index} className="transition-all hover:shadow-md border-slate-200">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold text-slate-800 leading-tight mb-2">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock size={14} />
                  <span>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
                </div>
              </div>
              {item.newAnnouncement && (
                <Badge 
                  variant="secondary" 
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none uppercase text-[10px] tracking-wider px-2"
                >
                  New
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div 
                className="text-sm leading-relaxed text-slate-600 max-w-[95%]"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getContent(item.description, index)) }}
              />
              {/* <p className="text-sm leading-relaxed text-slate-600 max-w-[95%]">
                { getContent(item.description, index) }
              </p> */}
            </CardContent>
            <CardFooter>
              <Button 
                variant="default" // Changed from outline to default for solid background
                size="sm" 
                className={`
                  h-8 text-xs font-semibold px-4
                  bg-slate-900 text-slate-50 hover:bg-slate-800 
                  dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200
                  transition-all duration-200 active:scale-95
                  border border-slate-800 shadow-sm
                `}
                onClick={() => setIsExpanded({
                  expanded: !(isExpanded.expanded && isExpanded.index === index), 
                  index: index 
                })}
              >
                { (isExpanded.expanded && isExpanded.index === index) ? "Show Less" : "Show More" }
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-6 pb-10">
        <Pagination
          current={page}
          total={data.total}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
        />
      </div>

      <style>
        {`
        .ant-pagination-item-active {
          border-color: #2563eb !important;
        }
        .ant-pagination-item-active a {
          color: #2563eb !important;
        }
        .ant-pagination-item:hover {
          border-color: #2563eb !important;
        }
        .ant-pagination-item:hover a {
          color: #2563eb !important;
        }
      `}
      </style>
    </div>
  )
}

export default AnnouncementFeed