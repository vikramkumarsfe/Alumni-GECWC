"use client";

import Link from "next/link";
import Image from "next/image";
import { Form, Input, Button, message, Skeleton, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import type { FormProps } from "antd";

import forgotPasswordImage from "@/public/images/forgot.png";
import axios from "axios";
import clientCatchError from "@/utils/clientCatchError";
import { useState } from "react";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  const forgotPassword = async(values : any) => {
    try{
      setLoading(true)
      const data = await axios.post('/api/user/forgot-password', values)
      message.success("Email sent succesfully")
      form.resetFields()
    }
    catch(err)
    {
      clientCatchError(err)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-full md:w-[50%] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Forgot password?
          </h1>

          <p className="text-gray-500 mb-8">
            Please, enter the email associated with your account and we’ll
            send an email with a link where you can change your password.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={forgotPassword}
          >
            {/* Email Field */}
            <Form.Item
              label="Your email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="emily.clarke@gmail.com"
                size="large"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              {
                loading ? 
                <Spin indicator={<LoadingOutlined spin />} size="small" />
                :
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className="!bg-[#6C63FF] hover:!bg-[#5a52d6]"
                >
                  Send
                </Button>
              }
            </Form.Item>
          </Form>

          <p className="text-center text-gray-500 mt-6">
            Or you can{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium underline"
            >
              log in
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right Section (Hidden on small screens) */}
      <div className="hidden md:flex w-[50%] items-center justify-center">
        <Image
          src={forgotPasswordImage}
          alt="Forgot Password"
          className="w-3/4 object-contain"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
