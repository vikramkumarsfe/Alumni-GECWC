"use client";

import Link from "next/link";
import { Button, Result } from "antd";
import { HomeOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl text-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link href="/">
              <Button
                type="primary"
                icon={<HomeOutlined />}
                className="bg-blue-600 hover:!bg-blue-700 border-none"
              >
                Back Home
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  );
}
