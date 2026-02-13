'use client'

import React, { useState } from 'react'
import { Card, Button, Form, Input, message } from 'antd'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import clientCatchError from '@/utils/clientCatchError'

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const Login = async (values: any) => {
    try {
      setLoading(true)
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (res?.error) {
        message.error("Invalid email or password")
        return
      }

      message.success("Login successful")
      router.push("/dashboard") // change route if needed

    } catch (err) {
      clientCatchError(err)
    }
    finally
    {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen justify-center items-center bg-gray-100'>
      <Card hoverable className='w-6/12 shadow-lg rounded-xl'>
        <h1 className='text-2xl font-semibold mb-4 text-center'>Signin</h1>

        <Form layout='vertical' onFinish={Login}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input size='large' placeholder='example@gmail.com' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password size='large' placeholder='************' />
          </Form.Item>

          <Form.Item>
            <Button
              size='large'
              htmlType='submit'
              type='primary'
              className='w-full'
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className='flex items-center justify-center gap-2'>
          <label>Don’t have an account?</label>
          <Link href='/signup' className='text-blue-600 font-medium'>
            Register now
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Signup
