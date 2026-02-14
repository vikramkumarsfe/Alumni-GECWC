"use client"

import { useEffect, useState } from "react"
import AlumniCard from "./AlumniCard"
import AlumniSearchFilter from "./AlumniSearchFilter"
import { Pagination } from "antd"

interface Alumni {
  _id: string
  fullname: string
  image: string
  department: string
  batch: string
}

const departments = [
  "Computer Science",
  "Mechanical",
  "Electrical",
  "Civil",
  "Electronics",
]

const randomNames = [
  "Vikram Kumar",
  "Amit Sharma",
  "Priya Singh",
  "Rahul Verma",
  "Neha Gupta",
  "Arjun Patel",
  "Sneha Rao",
  "Rohit Mehta",
  "Ananya Das",
  "Kunal Jain",
]

function generateRandomAlumni(count: number): Alumni[] {
  return Array.from({ length: count }, (_, i) => ({
    _id: `id-${i + 1}`,
    fullname: randomNames[Math.floor(Math.random() * randomNames.length)],
    image: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`,
    department:
      departments[Math.floor(Math.random() * departments.length)],
    batch: (2015 + Math.floor(Math.random() * 10)).toString(),
  }))
}

export default function AlumniGrid() {
  const [data, setData] = useState<Alumni[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const pageSize = 12

  useEffect(() => {
    const allData = generateRandomAlumni(30)

    const filtered = allData.filter((item) =>
      item.fullname.toLowerCase().includes(search.toLowerCase())
    )

    const start = (page - 1) * pageSize
    const paginated = filtered.slice(start, start + pageSize)

    setData(paginated)
  }, [page, search])

  return (
    <>
      <AlumniSearchFilter
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {data.map((item) => (
          <AlumniCard key={item._id} alumni={item} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Pagination
          current={page}
          total={30}
          pageSize={pageSize}
          onChange={(p) => setPage(p)}
        />
      </div>
    </>
  )
}
