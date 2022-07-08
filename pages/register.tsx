import type { NextPage } from 'next'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ReturnToHome from '../components/partials/returnToHome'
import { useAuth } from '../context/AuthContext'

const Register: NextPage<any> = (props: { team: string, teamData: any }) => {
  // @ts-ignore - TODO: AuthContext isn't using Types yet.
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

    const newUserDetails = {
      teamName: formData.get('teamName') as string,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      passwordConfirm: formData.get('confirmPassword') as string,
      team: props.team || null
    }

    const res = await createUserWithDetails(newUserDetails);
    if (res?.message === "success") {
      router.push('/dashboard');
    }
  };

  return (
    <div className='bg-main h-screen'>
      <Head><title>Pong | Register</title></Head>
      <main className='flex justify-center items-center p-8 h-full'>
        <section className='flex flex-col w-full max-w-xs mx-auto'>
          <h1 className='text-4xl font-medium text-center mb-4'>Start Playing 🏓</h1>
          <form onSubmit={submitUserForm}>
            <div className='flex flex-col md:justify-center space-y-4 mt-4'>
              {props.team ? (<h2>Joining Team: {props.teamData.name}</h2>)
                : (<input type="text" name="teamName" placeholder="Team Name" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />)}
              <input type="text" name="name" placeholder="Name" required className='text-gray-700 w-full p-3 rounded-md border-2 border-gray-200' />
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

export async function getServerSideProps(context: any) {

  const api_url = process.env.API_URL || 'http://localhost:3000/api'

  // get team query param from url
  let team = context.query.team || null as string | null;

  let teamApiResponse = await fetch(api_url + '/teams/get?team=' + encodeURIComponent(team))
  let teamData = await teamApiResponse.json()
  teamData = teamData.data || null
  team = teamData.name || null
  return {
    props: { team, teamData }, // will be passed to the page component as props
  }
}

export default Register;
