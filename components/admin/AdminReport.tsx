"use client"

import { Table, Button, Tag, message } from "antd"
import type { ColumnsType } from "antd/es/table"
import { DownloadOutlined, FileExcelOutlined, PrinterOutlined, ShareAltOutlined } from "@ant-design/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSpreadsheet } from "lucide-react"
import useSWR from "swr"
import { fetcher } from "@/utils/fetcher"

interface Alumni {
  key: string
  name: string
  batch: string
  department: string
  role: string
  status: string
}

interface Event {
  key: string
  name: string
  date: string
  type: string
  registered: number
  attended: number
}

interface Job {
  key: string
  title: string
  company: string
  date: string
  applications: number
  status: string
}

const AdminReports = () => {

  const { data : AlumniData , error : AlumniError, isLoading : AlumniIsLoading} = useSWR('/api/admin/all-users', fetcher)
  const { data : EventData , error : EventError, isLoading : EventIsLoading} = useSWR('/api/event/all-events', fetcher)
  const { 
  data: AlumniPendingData, 
  error: AlumniPendingError, 
  isLoading: AlumniPendingIsLoading 
} = useSWR('/api/admin/all-users?pending=true', fetcher);

  console.log(AlumniData)
  const alumniData: Alumni[] = [
    {
      key: "1",
      name: "Sarah Connor",
      batch: "2020",
      department: "Computer Science",
      role: "Software Engineer",
      status: "Active",
    },
    {
      key: "2",
      name: "John Reese",
      batch: "2019",
      department: "Mechanical Engineering",
      role: "Project Manager",
      status: "Active",
    },
  ]

  const eventData: Event[] = [
    {
      key: "1",
      name: "Annual Alumni Meet 2024",
      date: "Oct 15, 2024",
      type: "Reunion",
      registered: 450,
      attended: 385,
    },
  ]

  // -------------------- Columns --------------------

  const alumniColumns: ColumnsType<Alumni> = [
    { title: "Name", dataIndex: "name" },
    { title: "Batch", dataIndex: "batch" },
    { title: "Department", dataIndex: "department" },
    { title: "Current Role", dataIndex: "role" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "orange"}>
          {status}
        </Tag>
      ),
    },
  ]

  const eventColumns: ColumnsType<Event> = [
    { title: "Event Name", dataIndex: "name" },
    { title: "Date", dataIndex: "date" },
    { title: "Type", dataIndex: "type" },
    { title: "Registered", dataIndex: "registered" },
    { title: "Attended", dataIndex: "attended" },
  ]

  const handleAlumniDownload = () => {
    message.warning("This section is in under construction and the data shown is dummy.")
  }

  const handleEventDownload =() => {
    message.warning("This section is in under construction and the data shown is dummy.")
  }
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Reports & Insights</h1>
          <p className="text-muted-foreground text-sm">
            Overview of system performance and activities.
          </p>
        </div>
        <Button icon={<DownloadOutlined />}>Export All Data</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{AlumniData && AlumniData.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{EventData && EventData.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Alumni</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{AlumniPendingData && AlumniPendingData.total}</p>
          </CardContent>
        </Card>
      </div>

      {/* Alumni Report */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center overfolw-x-auto">
          <CardTitle>Alumni Directory Report</CardTitle>
          <Button icon={<FileSpreadsheet />} onClick={handleAlumniDownload}>Export CSV</Button>
        </CardHeader>
        <CardContent>
          <Table
            columns={alumniColumns}
            dataSource={alumniData}
            pagination={false}
          />
        </CardContent>
      </Card>

      {/* Event Report */}
      <Card className="overflow-x-auto">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Event Attendance Summary</CardTitle>
          <Button icon={<PrinterOutlined />} onClick={handleEventDownload}>Print Report</Button>
        </CardHeader>
        <CardContent>
          <Table
            columns={eventColumns}
            dataSource={eventData}
            pagination={false}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminReports