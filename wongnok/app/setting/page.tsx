"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = {}

export default function Setting({}: Props) {
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
        <div className="">
            setting
        </div>
    )
  )
}