'use client'
import clientCatchError from '@/utils/clientCatchError'
import { Card, Button, Form, Input, message, Skeleton } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Signup = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const register = async (values : any) => {
    try {
      setLoading(true)
      const {data} = await axios.post('/api/user/signup', values)

      console.log(data)

      message.success("Signup Success, You are being redirected!!")
      router.push('/login')
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
      <div className='flex h-screen justify-center items-center'>
        <Card hoverable className='w-6/12 shadow-lg'>
          <h1 className='text-2xl font-semibold mb-4'>Register</h1>
          <Form layout='vertical' onFinish={register}>
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
              {
                loading ? 
                <Skeleton active /> 
                : 
                <Button size='large' htmlType='submit' type='primary'>Signup</Button>
              }
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
