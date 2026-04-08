'use client'
import clientCatchError from '@/utils/clientCatchError'
import { Card, Button, Form, Input, message, Skeleton, InputNumber, Select, Row, Col } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Option } = Select;

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const register = async (values: any) => {
    try {
      setLoading(true)
      await axios.post('/api/user/signup', values)
      message.success("Awaiting approval. Confirmation email soon.")
      router.push('/thankyou') 
    }
    catch (err) {
      clientCatchError(err)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{ minHeight: '100dvh' }}
      className='w-full py-10 flex justify-center items-center bg-gray-50 px-2'
    >
      <Card hoverable className='w-full max-w-2xl shadow-lg border-stone-200'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-stone-800'>Create Alumni Account</h1>
          <p className='text-stone-500'>Join the GECWC Alumni Network</p>
        </div>

        <Form layout='vertical' onFinish={register} requiredMark={false}>
          <Row gutter={16}>
            {/* Fullname */}
            <Col span={24}>
              <Form.Item
                label='Full Name'
                name='fullname'
                rules={[{ required: true, message: 'Please enter your full name' }]}
              >
                <Input size='large' placeholder='John Doe' />
              </Form.Item>
            </Col>

            {/* Email & Mobile */}
            <Col xs={24} md={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
              >
                <Input size='large' placeholder='example@gmail.com' />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label='Mobile No.'
                name='mobile'
                rules={[{ required: true, message: 'Mobile number is required' }]}
              >
                <Input size='large' placeholder='0123456789' />
              </Form.Item>
            </Col>

            {/* Registration No & Batch */}
            <Col xs={24} md={8}>
              <Form.Item
                label='Registration No.'
                name='regNo'
                rules={[{ required: true, message: 'Please enter your Reg No.' }]}
              >
                <Input size='large' placeholder='000000000' />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label='Batch (Admission Year)'
                name='batch'
                rules={[{ required: true, message: 'Select your admission year' }]}
              >
                <InputNumber
                  size='large'
                  className='w-full'
                  placeholder='e.g. 2022'
                  min={1990}
                  max={2050}
                />
              </Form.Item>
              </Col>
              <Col xs={24} md={8}>
              <Form.Item
                label='Role'
                name='role'
                rules={[{ required: true, message: 'Select your admission year' }]}
                className='px-3 py-3'
              >
                <Select size='small' placeholder='select Role'>
                  <Option value="alumni">Alumni</Option>
                  <Option value="student">Student</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Branch */}
            <Col span={24}>
              <Form.Item
                label='Branch'
                name='branch'
                rules={[{ required: true, message: 'Select your department' }]}
              >
                <Select size='large' placeholder='Select your branch'>
                  <Option value="Computer Science & Engineering">Computer Science & Engineering</Option>
                  <Option value="Computer Science & Engineering(Cyber Security)">Computer Science & Engineering(Cyber Security)</Option>
                  <Option value="Civil Engineering">Civil Engineering</Option>
                  <Option value="VLSI">VLSI</Option>
                  <Option value="Electronics & Communication">Electronics & Communication</Option>
                  <Option value="Mechanical Engineering">Mechanical Engineering</Option>
                  <Option value="Electrical Engineering">Electrical Engineering</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}
              >
                <Input.Password size='large' placeholder='************' />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item className='mt-2'>
                {loading ? (
                  <Skeleton.Button active block size='large' />
                ) : (
                  <Button size='large' htmlType='submit' type='primary' block className='bg-blue-600'>
                    Register
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className='flex items-center justify-center gap-2 mt-4'>
          <span className='text-stone-500'>Already have an account?</span>
          <Link href='/login' className='text-blue-600 font-medium hover:underline'>
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default Signup
