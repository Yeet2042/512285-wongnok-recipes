"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

export default function SignIn({}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })
            if (result?.error) {
                alert("Invalid email or password")
            } else {
                router.push('/profile')
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div className="bg-black text-white h-screen flex flex-col items-center justify-center">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-black' />
                <label htmlFor="password">Password</label> 
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-black' />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}