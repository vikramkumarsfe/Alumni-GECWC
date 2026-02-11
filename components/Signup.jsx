'use client'
import React from 'react'
import { Card, Button, Form, Input } from 'antd'
import Link from 'next/link'
const Signup = () => {
  return (
      <div className='flex h-screen justify-center items-center'>
        <Card hoverable className='w-6/12 shadow-lg'>
          <h1 className='text-2xl font-semibold mb-4'>Register</h1>
          <Form layout='vertical' >
            <Form.Item
              label='Fullname'
              name='fullname'
              rules={[{required:true}]}
            >
              <Input size='large' placeholder='Enter your fullname' />
            </Form.Item>

            <Form.Item
              label='Mobile No.'
              name='mobile'
              rules={[{required:true}]}
            >
              <Input size='large' placeholder='0123456789' />
            </Form.Item>
  
            <Form.Item
              label='Email'
              name='email'
              rules={[{required:true}]}
            >
              <Input size='large' placeholder='example@gmail.com' />
            </Form.Item>
  
            <Form.Item
              label='Password'
              name='password'
              rules={[{required:true}]}
            >
              <Input size='large' placeholder='************' />
            </Form.Item>
  
            <Form.Item>
              <Button size='large' htmlType='submit' type='primary'>Signup</Button>
            </Form.Item>
          </Form>
          <div className='flex items-center gap-3'>
            <label>Already have an account ?</label>
            <Link href='/login' className='text-blue-600 font-medium'>Login</Link>
          </div>
        </Card>
      </div>
    )
}

export default Signup
