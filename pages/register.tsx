import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ReturnToHome from '../components/partials/returnToHome'

const Register: NextPage = () => {
  return (
    <div className='bg-main'>
      <Head><title>Pong | Register</title></Head>
      <main className='flex justify-center p-8'>
        <section className='flex flex-col w-full max-w-xs mx-auto'>
          <h1 className='text-4xl font-medium text-center mb-4'>Start Playing 🏓</h1>
          <form action="/api/register">
            <div className='flex flex-col md:justify-center space-y-4 mt-4'>
                <input type="name" name="name" placeholder="Name" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
                <input type="email" name="email" placeholder="Email" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
                <input type="password" name="password" placeholder="Password" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
            </div>
            <div className='flex flex-col justify-center'>
                <input type="submit" value='Register' className='my-4 text-center py-4 rounded-sm bg-blue-800 hover:bg-blue-900 w-full mx-auto' />
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
