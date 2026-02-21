'use client'
import React, { FC, useEffect, useState } from 'react';
import { 
  Form, Input, DatePicker, Select, InputNumber, 
  Button as AntButton, Space, Divider, message, Row, Col 
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import dayjs from 'dayjs';

const { TextArea } = Input;
interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any; 
  mode: 'create' | 'update';
}

const AdminEventForm : FC<EventFormProps> = ({ isOpen, onClose, initialData, mode }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && initialData) {
        form.setFieldsValue({
          ...initialData,
          date: initialData.date ? dayjs(initialData.date) : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, initialData, mode, form]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {/* 1. h-full and flex-col are key here */}
      <SheetContent className="sm:max-w-[650px] p-0 flex flex-col h-full gap-0">
        
        {/* 2. Fixed Header */}
        <SheetHeader className="p-6 border-b shrink-0 bg-white">
          <SheetTitle className="text-xl font-bold">
            {mode === 'create' ? 'Create New Event' : 'Edit Event'}
          </SheetTitle>
          <SheetDescription>
            Manage alumni event details and schedule.
          </SheetDescription>
        </SheetHeader>

        {/* 3. Scrollable Area (The Form) */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ capacity: 100, agenda: [] }}
          >
            <div className="space-y-8">
              {/* Basic Details */}
              <section>
                <h3 className="text-sm font-semibold text-blue-600 uppercase mb-4">General Info</h3>
                <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
                  <Input placeholder="Enter title" className="h-10" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="category" label="Category">
                      <Select placeholder="Select type" className="h-10">
                        <Select.Option value="Networking">Networking</Select.Option>
                        <Select.Option value="Seminar">Seminar</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="capacity" label="Capacity">
                      <InputNumber className="w-full h-10 flex items-center" min={1} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="description" label="Description">
                  <TextArea rows={4} />
                </Form.Item>
              </section>

              {/* Venue & Time */}
              <section className="pt-6 border-t">
                <h3 className="text-sm font-semibold text-blue-600 uppercase mb-4">Logistics</h3>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                      <DatePicker className="w-full h-10" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="venueName" label="Venue">
                      <Input placeholder="Hall Name" className="h-10" />
                    </Form.Item>
                  </Col>
                </Row>
              </section>

              {/* Dynamic Agenda Section (Can get very long) */}
              <section className="pt-6 border-t pb-10">
                <h3 className="text-sm font-semibold text-blue-600 uppercase mb-4">Agenda</h3>
                <Form.List name="agenda">
                  {(fields, { add, remove }) => (
                    <div className="space-y-3">
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="flex gap-2 items-start bg-slate-50 p-3 rounded-md border border-slate-100">
                          <Form.Item {...restField} name={[name, 'time']} noStyle>
                            <Input placeholder="10:00" className="w-24" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'title']} noStyle>
                            <Input placeholder="Topic" className="flex-1" />
                          </Form.Item>
                          <AntButton type="text" danger onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
                        </div>
                      ))}
                      <AntButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />} className="h-10">
                        Add Session
                      </AntButton>
                    </div>
                  )}
                </Form.List>
              </section>
            </div>
          </Form>
        </div>

        {/* 4. Fixed Footer */}
        <div className="p-4 border-t bg-slate-50 shrink-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={() => form.submit()} 
            className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
          >
            {mode === 'create' ? 'Create' : 'Save'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminEventForm;