import type { NextComponentType } from 'next'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

const ReturnToHome: NextComponentType = () => {
    return (
        <>
            <Link href="/"><a className='flex items-center mx-auto space-x-2 mt-2 transition-all hover:text-blue-700'>
                <BsArrowLeft /><span>Return To Homepage</span>
            </a></Link>
        </>
    )
}

export default ReturnToHome;
