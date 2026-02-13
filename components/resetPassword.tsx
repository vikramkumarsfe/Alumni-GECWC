"use client";

import Link from "next/link";
import { Form, Input, Button, message, Spin } from "antd";
import clientCatchError from "@/utils/clientCatchError";
import { usePathname, useSearchParams } from "next/navigation";
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
import { useState } from "react";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const [ loading, setLoading] = useState(false)

  const setPassword = async(values : any) => {
    try 
    {
      setLoading(true)
      const token = searchParams.get("token")
      const payload = {
        token,
        password : values.password
      }

      const { data } = await axios.post('/api/user/set-password', payload)

      message.success("Password updated successfully")


    }
    catch(err)
    {
      clientCatchError(err)
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center  px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Reset Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create a new password for your account.
          Make sure it is strong and secure.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={setPassword}
          className="space-y-2"
        >
          {/* New Password */}
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              className="py-2"
            />
          </Form.Item>

          {/* Confirm Password */} 
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item>
            {
              loading ? 
                <Spin indicator={<LoadingOutlined spin />} size="small" />
                :
              <Button
                type="primary"
                htmlType="submit"
                block
                className="!bg-[#6C63FF] hover:!bg-[#5a52d6] h-11 rounded-md"
              >
                Reset Password
              </Button>
            }
          </Form.Item>
        </Form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium underline"
          >
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
