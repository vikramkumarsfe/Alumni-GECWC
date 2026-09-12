'use client'
import React, { FC, useEffect, useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button as AntButton,
  TimePicker,
  Row,
  Col,
  message,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import dayjs from 'dayjs';
import clientCatchError from '@/utils/clientCatchError';
import axios from 'axios';
import { mutate } from 'swr';

const { TextArea } = Input;

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  mode: 'create' | 'update';
  onSubmit?: (values: any) => void;
}

const AdminEventForm: FC<EventFormProps> = ({
  isOpen,
  onClose,
  initialData,
  mode,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'update' && initialData) {
      form.setFieldsValue({
        ...initialData,
        date: initialData.date ? dayjs(initialData.date) : null,
        startTime: initialData.startTime
          ? dayjs(initialData.startTime, 'h:mm a')
          : null,
        endTime: initialData.endTime
          ? dayjs(initialData.endTime, 'h:mm a')
          : null,
        status: initialData.status || 'upcoming',
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 'upcoming' });
    }
  }, [isOpen, mode, initialData, form]);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        date: values.date?.toISOString(),
        startTime: values.startTime?.format('h:mm a'),
        endTime: values.endTime?.format('h:mm a'),
      };

      if (mode === 'create') {
        await axios.post('/api/event', payload);
        message.success("Event created successfully!");
      } 
      else if (mode === 'update' && initialData?._id) {
        await axios.put(`/api/event/${initialData._id}`, payload);
        message.success("Event updated successfully!");
      }
      mutate('/api/event');
      onClose();
      form.resetFields();
    } catch (err) {
      clientCatchError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="admin-dialog w-full sm:max-w-[700px] p-0 flex flex-col h-full gap-0">
        <SheetHeader className="p-6 border-b shrink-0 bg-white">
          <SheetTitle className="text-xl font-bold">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </SheetTitle>
          <SheetDescription>
            Update event details for alumni.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
          >
            {/* GENERAL INFO */}
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  name="title"
                  label="Event Title"
                  rules={[{ required: true }]}
                >
                  <Input className="h-10" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="status" label="Event Status">
                  <Select
                    className="h-10"
                    getPopupContainer={(node) => node.parentElement!}
                    options={[
                      { value: 'upcoming', label: 'Upcoming' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'cancelled', label: 'Cancelled' },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Select
                    className="h-10"
                    getPopupContainer={(node) => node.parentElement!}
                    options={[
                      { value: 'Networking', label: 'Networking' },
                      { value: 'Seminar', label: 'Seminar' },
                      { value: 'Workshop', label: 'Workshop' },
                      { value : 'Other', label : 'other'}
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="capacity" label="Capacity">
                  <InputNumber
                    className="w-full h-10"
                    min={1}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="organizerName" label="Organizer Name">
              <Input className="h-10" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={4} />
            </Form.Item>

            {/* LOGISTICS */}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="date"
                  label="Event Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full h-10" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="startTime" label="Start Time">
                  <TimePicker
                    format="h:mm a"
                    className="w-full h-10"
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="endTime" label="End Time">
                  <TimePicker
                    format="h:mm a"
                    className="w-full h-10"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="venueName" label="Venue Name">
              <Input className="h-10" />
            </Form.Item>

            <Form.Item name="venueAddress" label="Venue Address">
              <Input className="h-10" />
            </Form.Item>

            {/* AGENDA */}
            <Form.List name="agenda">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      className="flex gap-3 mb-3"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'time']}
                        rules={[{ required: true }]}
                        className="flex-1"
                      >
                        <Input placeholder="Time" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true }]}
                        className="flex-1"
                      >
                        <Input placeholder="Session Title" />
                      </Form.Item>

                      <AntButton
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      />
                    </div>
                  ))}

                  <AntButton
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Add Session
                  </AntButton>
                </>
              )}
            </Form.List>
          </Form>
        </div>

        <div className="p-4 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className='cursor-pointer'>
            Cancel
          </Button>
          <Button
            onClick={() => form.submit()}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            {mode === 'create' ? 'Create' : 'Save Changes'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminEventForm;