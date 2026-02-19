"use client"

import {  useState } from "react"
import AlumniCard from "./AlumniCard"
import AlumniSearchFilter from "./AlumniSearchFilter"
import { Pagination, Skeleton } from "antd"
import useSWR from "swr"
import ErrorState from "../shared/Errorstate"
import { fetcher } from "@/utils/fetcher"


export default function AlumniGrid() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const pageSize = 12
  const { data: SwrData, isLoading, error } = useSWR(
    `/api/alumni?page=${page}&limit=${pageSize}`,
    fetcher
  )

if (isLoading) return <Skeleton active />
if (error) return <ErrorState />

const data = SwrData?.data || []

const total = SwrData?.pagination.total || 12

  return (
    <>
      <AlumniSearchFilter
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {data.map((item : any) => (
          <AlumniCard key={item._id} alumni={item} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
        />
      </div>
    </>
  )
}
