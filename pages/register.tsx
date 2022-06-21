import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReturnToHome from '../components/partials/returnToHome'
import { useAuth } from '../context/AuthContext'

const Register: NextPage = () => {
  const { user, createUserWithDetails } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])

  const submitUserForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (formData.get('password') !== formData.get('confirmPassword')) {
      return alert('Passwords do not match');
    }

    const newUser = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordConfirm: formData.get('confirmPassword') as string
    }

    const res = await createUserWithDetails(newUser);
    if (res?.message === "success") {
      router.push('/dashboard');
    }
  };

  return (
    <div className='bg-main h-screen'>
      <Head><title>Pong | Register</title></Head>
      <main className='flex justify-center items-center p-8 h-4/5'>
        <section className='flex flex-col w-full max-w-xs mx-auto'>
          <h1 className='text-4xl font-medium text-center mb-4'>Start Playing 🏓</h1>
          <form onSubmit={submitUserForm}>
            <div className='flex flex-col md:justify-center space-y-4 mt-4'>
              <input type="name" name="name" placeholder="Name" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
              <input type="email" name="email" placeholder="Email" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
              <input type="password" name="password" placeholder="Password" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
            </div>
            <div className='flex flex-col justify-center'>
              <input type="submit" value='Register' className='my-4 text-center font-bold py-4 rounded-sm bg-blue-800 hover:bg-blue-900 w-full mx-auto' />
              <p className='text-center'>Already have an account?<Link href="/login"><a className='ml-2 text-blue-500 hover:text-blue-700'>Login</a></Link></p>
              <ReturnToHome />
            </div>
          </form>
        </section>
      </main>

    </div>
  )
}

export default Register;
