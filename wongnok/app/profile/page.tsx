'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Profile() {
    const { data: session, status } = useSession()
    console.log(session)
    
    const router = useRouter()
    
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [status, router])

    return (
        status === 'authenticated' &&
        session.user && (
            <div className='bg-black text-white h-screen flex flex-col items-center justify-center'>
                Hello World
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-white"
                >
                    Logout
                </button>
            </div>
        )
    )
}