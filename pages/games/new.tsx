import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router'

const NewGame: NextPage = () => {
  // @ts-ignore
  const { user, userData, loading, logout, teamMembers } = useAuth()
  const router = useRouter()
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);
  const [p1Email, setP1Email] = useState('');
  const [p2Email, setP2Email] = useState('');

  useEffect(() => {
    if (!loading && !user) {
        // if signed out, redirect to login
       router.push('/login');
    }
    if (userData?.email) setP1Email(userData.email);
  }, [user, loading]);

  const handleP1Score = (e: React.FormEvent<HTMLInputElement>) => {
      setP1Score(parseInt(e.currentTarget.value));
  }

  const handleP2Score = (e: React.FormEvent<HTMLInputElement>) => {
    setP2Score(parseInt(e.currentTarget.value));
  }

  const handleP1Email = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setP1Email(e.currentTarget.value)
  }  

  const handleP2Email = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setP2Email(e.currentTarget.value)
  }

  const submitGameForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // only submit if all fields are filled in 
    if (!p1Email || !p1Score || !p2Email || !p2Score) {
        return alert("Please fill in all fields");
    }

    // post game data
    let response = await fetch('/api/games/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({p1Email, p1Score, p2Email, p2Score, team:userData.team})
    });
    let responseJson = await response.json();

    // if successful, return to home
    if (responseJson.message="success") return router.push("/dashboard");
  }

  return (
    <div className='bg-main h-screen'>
      <Head><title>Pong | New Game</title></Head>
      <header>
        <nav className='flex flex-col h-full sm:flex-row justify-between items-center p-8'>
          <h1>Dashboard for <strong>{userData?.email || "..."}</strong></h1>
          <div className='flex mt-4 sm:mt-0 space-x-4'>
            <button className="p-2 border-2 font-bold px-6 rounded transition-all hover:text-gray-400 hover:border-gray-400" onClick={logout}>Logout</button>
          </div>
        </nav>
      </header>
      <main className='md:h-4/5'>
        <section className='px-6 flex flex-wrap h-full'>
          <section className='m-2 p-4 basis-72 bg-gray-700 rounded w-1/2 max-w-sm mx-auto h-min grow'>
            <h2 className='mb-8'>Input Player Scores</h2>
            <form onSubmit={submitGameForm}>
                <div className='flex justify-between w-full mb-4'>
                    {/* select player */}
                    <div>
                        <select className='text-gray-700 p-2 rounded' value={p1Email} onChange={handleP1Email} name="p1_name" id="p1_name">
                            <option value="">Select Player</option>
                            {teamMembers?.map(p=><option key={p.uid} value={p.email}>{p.name}</option>)}
                        </select>
                        <label htmlFor="p1"> 's Score</label>
                    </div>
                    <input className="text-gray-700 p-2 rounded" value={p1Score} onChange={handleP1Score} type="number" id="p1" name="p1" min="0" max="50"></input>
                </div>
                <div className='flex justify-between w-full mb-4'>
                    <div>
                        <select className='text-gray-700 p-2 rounded' value={p2Email} onChange={handleP2Email} name="p2_name" id="p2_name">
                            <option value="">Select Player</option>
                            {teamMembers?.map(p=><option key={p.uid} value={p.email}>{p.name}</option>)}
                        </select>
                        <label htmlFor="p2"> 's Score</label>
                    </div>
                    <input className="text-gray-700 p-2 rounded"  value={p2Score} onChange={handleP2Score} type="number" id="p2" name="p2" min="0" max="50"></input>
                </div>
                <div>
                    <input type="submit" value="Submit Scores" className='py-2 border-2 font-bold border-blue-800 text-center px-6 rounded bg-blue-800 hover:bg-blue-900 hover:border-blue-900 transition-all w-full' />
                </div>
            </form>
          </section>
        </section>
      </main>

    </div>
  )
}

export default NewGame;
