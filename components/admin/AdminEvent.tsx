'use client'
import React, { useState } from 'react';
import { 
  Plus, Search, Eye, Pencil, Trash2, MapPin, Video 
} from 'lucide-react';
import { Table, Space, Tooltip, Input, Button as AntButton, Popconfirm, message } from 'antd';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminEventForm from './AdminEditEvent';

const AdminEvents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- State for Drawer Control ---
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [mode, setMode] = useState<'create' | 'update'>('create');

  // Sample Data (Updated to match your Mongoose Model)
  const [data, setData] = useState([
    {
      _id: '1',
      title: 'Annual Alumni Gala 2026',
      category: 'Networking',
      date: '2026-10-15',
      startTime: '07:00 PM',
      endTime: '11:00 PM',
      venueName: 'Grand Hall',
      venueAddress: '123 University Way',
      organizerName: 'Admin Sarah',
      isPublished: true,
      capacity: 150,
      status: 'upcoming',
      description: 'A grand evening for all alumni.',
      agenda: [{ time: '07:00 PM', title: 'Welcome Drinks' }]
    },
  ]);

  const openCreateDrawer = () => {
    setMode('create');
    setSelectedEvent(null);
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (record: any) => {
    setMode('update');
    setSelectedEvent(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    // API call logic here
    setData(data.filter(item => item._id !== id));
    message.success("Event deleted successfully");
  };

  const columns = [
    {
      title: 'Event Details',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{text}</span>
          <span className="text-xs text-muted-foreground">{record.category}</span>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'dateTime',
      render: (record: any) => (
        <div className="text-sm">
          <div>{new Date(record.date).toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">{record.startTime} - {record.endTime}</div>
        </div>
      ),
    },
    {
      title: 'Venue',
      dataIndex: 'venueName',
      key: 'venueName',
      render: (venue: string, record: any) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={14} />
          <span className="text-sm">{venue || "TBD"}</span>
        </div>
      ),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge variant={status === 'upcoming' ? "default" : "secondary"} className="capitalize">
          {status}
        </Badge>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="Edit Event">
            <AntButton 
              type="text" 
              icon={<Pencil size={16} />} 
              onClick={() => openEditDrawer(record)}
              className="text-slate-500 hover:text-amber-600" 
            />
          </Tooltip>
          
          <Popconfirm
            title="Delete Event"
            description="Are you sure you want to delete this event?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Event">
              <AntButton type="text" danger icon={<Trash2 size={16} />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Events</h1>
          <p className="text-muted-foreground text-sm">Create, edit, and track alumni gatherings.</p>
        </div>
        <Button onClick={openCreateDrawer} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      {/* Main Content Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by title or venue..." 
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table 
            columns={columns} 
            dataSource={data.filter(event => 
                event.title.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
          />
        </CardContent>
      </Card>

      {/* --- FORM DRAWER COMPONENT --- */}
      <AdminEventForm 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={mode}
        initialData={selectedEvent}
      />
    </div>
  );
};

export default AdminEvents;