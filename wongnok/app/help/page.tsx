"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {}

export default function Help({}: Props) {
    const { data: session, status } = useSession()
    
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
                help
            </div>
        )
    )
}