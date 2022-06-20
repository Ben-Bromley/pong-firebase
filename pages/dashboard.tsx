import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <div className='bg-main h-screen'>
      <Head><title>Pong | Dashboard</title></Head>
      <header>
        <nav className='flex flex-col h-full sm:flex-row justify-between items-center p-8'>
          <h1>Dashboard for <strong>{user?.email}</strong></h1>
          <div className='flex mt-4 sm:mt-0 space-x-4'>
            <button className='p-2 border-2 font-bold border-blue-800 text-center px-6 rounded bg-blue-800 hover:bg-blue-900 hover:border-blue-900 transition-all'>New Game</button>
            <button className="p-2 border-2 font-bold px-6 rounded transition-all hover:text-gray-400 hover:border-gray-400" onClick={logout}>Logout</button>
          </div>
        </nav>
      </header>
      <main className='md:h-4/5'>
        <section className='px-6 flex flex-wrap h-full'>
          <section className='m-2 basis-72 bg-gray-700 rounded w-1/2 grow'>
            <h2 className='p-4'>Leaderboard</h2>
            <ul>
              <li className='bg-gray-600 p-4'>#1 Ben D</li>
              <li className='bg-gray-500 p-4'>#2 Rich</li>
              <li className='bg-gray-600 p-4'>#3 Jacob</li>
              <li className='bg-gray-500 p-4'>#4 Ryan</li>
            </ul>
            <p className='text-center text-sm text-gray-400 p-2 my-2'>Add More Team Members</p>
          </section>
          <section className='m-2 basis-72 bg-gray-700 rounded w-1/2 grow p-4'>
            <h2>Match History</h2>
            <p className='text-gray-400'>No Matches</p>
          </section>
        </section>
      </main>

    </div>
  )
}

export default Login;
