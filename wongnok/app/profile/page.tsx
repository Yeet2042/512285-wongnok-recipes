'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Avatar } from '@nextui-org/react'

export default function Profile() {
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
            <>
                <div className="w-full mx-auto flex flex-col max-w-5xl">
                    <div className="container flex justify-center p-20">
                        <Avatar
                            isBordered
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            radius="full"
                            className="h-32 w-32"
                        />
                        <div className="ml-14">
                            <h1 className="text-2xl font-bold ">{session.user.username}</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}