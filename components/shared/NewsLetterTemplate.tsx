import clientCatchError from "@/utils/clientCatchError";
import { Modal, Form, Select, Button, message } from "antd";
import axios from "axios";
import { useState } from "react";

const months = [
  { label: "🌅 January • New Beginnings", value: "january" },
  { label: "❤️ February • Friendship", value: "february" },
  { label: "🌱 March • Growth", value: "march" },
  { label: "🤝 April • Mentorship", value: "april" },
  { label: "🎓 May • Memories", value: "may" },
  { label: "🚀 June • Dreams", value: "june" },
  { label: "📸 July • Throwback", value: "july" },
  { label: "🇮🇳 August • Pride", value: "august" },
  { label: "🌟 September • Success", value: "september" },
  { label: "🎉 October • Celebration", value: "october" },
  { label: "💙 November • Gratitude", value: "november" },
  { label: "🎊 December • Year in Review", value: "december" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (month: string) => void;
}

export default function NewsletterTemplateModal({open, onClose, onSelect, }: Props) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(async(values) => {
      try {
        onSelect(values.month);
        await axios.post("/api/admin/campaign/", values)
        
        message.success("Email sent")
      }
      catch(err)
      {
        clientCatchError(err)
      }
      finally {

        form.resetFields();
        onClose();
      }
      
    });
  };

  return (
    <Modal
      title="📬 Select Newsletter Template"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Send Mail
        </Button>,
      ]}
      centered
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Monthly Newsletter"
          name="month"
          rules={[
            {
              required: true,
              message: "Please select a newsletter template",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Choose a template"
            options={months}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}