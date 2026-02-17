"use client"

import { useState } from "react"
import { Plus, GraduationCap, Calendar, Award, MoreVertical, Pencil, Trash2, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

import { Modal, Form, Input, InputNumber, message, Skeleton } from "antd"
import axios from "axios"
import useSWR, { mutate } from "swr"
import { fetcher } from "@/utils/fetcher"
import ErrorState from "../shared/Errorstate"
import clientCatchError from "@/utils/clientCatchError"

interface Education {
  _id: string
  degreeName: string
  universityName: string
  completionYear: number
  score?: number
}

export default function AlumniPrivateEducationSection() {
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null)
  const [form] = Form.useForm()
  const { data, isLoading, error} = useSWR('/api/alumni/education', fetcher)

  if(isLoading)
    return <Skeleton  active/>

  if(error)
    return <ErrorState />

  const education = data

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing && selectedEducation) {
        await axios.put(
          `/api/alumni/education/${selectedEducation._id}`,
          values
        )
        message.success("Education updated successfully")
      } else {
        await axios.post("/api/alumni/education", values)
        message.success("Education added successfully")
      }

      form.resetFields()
      setOpen(false)
      setIsEditing(false)
      setSelectedEducation(null)

      mutate("/api/alumni/education")
    } catch (error) {
      clientCatchError(error)
    }
  }


  const handleEdit = (item: Education) => {
    setIsEditing(true)
    setSelectedEducation(item)

    form.setFieldsValue({
      degreeName: item.degreeName,
      universityName: item.universityName,
      completionYear: item.completionYear,
      score: item.score,
    })

    setOpen(true)
  }


  const handleDelete = async(id : string) => {
    try{
      await axios.delete(`/api/alumni/education/${id}`)
      message.success("Education deleted successfully")
      mutate('/api/alumni/education')
    }
    catch(err)
    {
      clientCatchError(err)
    }
  }

  return (
    <div className="mt-16 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Education
          </h2>
          <p className="text-sm text-slate-500">
            Manage your academic qualifications and achievements.
          </p>
        </div>

        <Button
          className="gap-2 shadow-sm"
          onClick={() => {
            setIsEditing(false)
            setSelectedEducation(null)
            form.resetFields()
            setOpen(true)
          }}
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>

      </div>

      {/* Education List */}
      <div className="space-y-6">
        {education.map((item, index) => (
          <Card key={index} className="border-slate-200/60">
            <CardContent className="p-6 flex gap-5">
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-600 border">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.degreeName}
                    </h3>
                    <p className="text-slate-600">
                      {item.universityName}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer">
                        <Pencil className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.completionYear}
                  </div>

                  {item.score && (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {item.score}%
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {education.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl border-slate-200">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">
              No education history added yet.
            </p>
          </div>
        )}
      </div>

      {/* Add Education Modal */}
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false)
          setIsEditing(false)
          setSelectedEducation(null)
          form.resetFields()
        }}
        footer={null}
        centered
        title={isEditing ? "Edit Education" : "Add Education"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          {/* Degree Name */}
          <Form.Item
            label="Degree Name"
            name="degreeName"
            rules={[
              { required: true, message: "Degree name is required" },
            ]}
          >
            <Input placeholder="B.Tech Computer Science" />
          </Form.Item>

          {/* University */}
          <Form.Item
            label="University Name"
            name="universityName"
            rules={[
              { required: true, message: "University name is required" },
            ]}
          >
            <Input placeholder="IIT Delhi" />
          </Form.Item>

          {/* Completion Year */}
          <Form.Item
            label="Completion Year"
            name="completionYear"
            rules={[
              { required: true, message: "Completion year is required" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1950}
              max={new Date().getFullYear()}
              placeholder="2024"
            />
          </Form.Item>

          {/* Score */}
          <Form.Item
            label="Score (%)"
            name="score"
            rules={[
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Score must be between 0-100",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={100}
              placeholder="85"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <Button className="w-full" type="submit">
              Save Education
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
