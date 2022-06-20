import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className='bg-main'>
      <Head>
        <title>Pong</title>
        <meta name="description" content="Ping Pong Leaderboard tracking for cool offices like REVIEWS.io" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className='p-4 flex justify-end'>
            <Link href="/login"><a className='p-2 font-bold border-2 px-6 rounded transition-all hover:text-gray-400 hover:border-gray-400'>
              Login
            </a></Link>
        </nav>
      </header>
      <main className='flex justify-center items-center p-8 h-screen'>
        <div className='flex flex-col justify-center items-center max-w-lg mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold text-center mb-4'>Welcome to Pong!</h1>
          <p className='text-center md:text-2xl text-gray-400 max-w-md'>Ping Pong Leaderboard tracking for cool offices like <a href="https://www.reviews.io">REVIEWS.io</a></p>
          <Link href="/register">
            <a className='my-4 text-center font-bold py-4 rounded bg-blue-800 hover:bg-blue-900 transition-all w-56 mx-auto'>Get Started</a>
          </Link>
        </div>
      </main>

    </div>
  )
}

export default Home
