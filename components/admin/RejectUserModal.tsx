"use client";

import { useRef, useState } from "react";
import { Alert, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { MAX_REJECTION_REMARK_LENGTH } from "@/lib/account-rejection";

interface RejectUserModalProps {
  user: { _id: string; fullname: string; email: string };
  onCancel: () => void;
  onRejected: () => void;
}

export default function RejectUserModal({ user, onCancel, onRejected }: RejectUserModalProps) {
  const [form] = Form.useForm<{ remark: string }>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestInFlight = useRef(false);

  const rejectUser = async ({ remark }: { remark: string }) => {
    if (requestInFlight.current) return;
    requestInFlight.current = true;
    setSubmitting(true);
    setError(null);

    try {
      await axios.delete(`/api/admin/users/${user._id}`, {
        data: { remark: remark.trim() },
      });
    } catch (err) {
      setError(
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Unable to reject the account. Please try again."
      );
      return;
    } finally {
      requestInFlight.current = false;
      setSubmitting(false);
    }

    message.success("Account rejected and remark emailed to the user.");
    onRejected();
  };

  return (
    <Modal
      open
      title="Reject account"
      okText="Reject and send email"
      okButtonProps={{ danger: true }}
      confirmLoading={submitting}
      cancelButtonProps={{ disabled: submitting }}
      closable={!submitting}
      keyboard={!submitting}
      maskClosable={!submitting}
      onCancel={() => { if (!requestInFlight.current) onCancel(); }}
      onOk={() => form.submit()}
    >
      <p className="mb-4 text-slate-600">
        Rejecting <strong>{user.fullname}</strong> will remove their account. Your remark
        will be emailed to <strong>{user.email}</strong> from the official portal email.
        This action cannot be undone.
      </p>
      {error && <Alert type="error" showIcon title={error} className="mb-4" />}
      <Form form={form} layout="vertical" onFinish={rejectUser} disabled={submitting}>
        <Form.Item
          label="Admin remark"
          name="remark"
          rules={[
            { required: true, whitespace: true, message: "Please enter a reason for rejection." },
            { max: MAX_REJECTION_REMARK_LENGTH, message: `Keep the remark within ${MAX_REJECTION_REMARK_LENGTH} characters.` },
          ]}
        >
          <Input.TextArea
            autoFocus
            rows={4}
            maxLength={MAX_REJECTION_REMARK_LENGTH}
            showCount
            placeholder="Explain why this registration is being rejected..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
