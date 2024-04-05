'use client'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

type Props = {}

export default function Page({}: Props) {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if ( password !== confirmPassword ) {
            return
        }
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })
            if ( res.status === 400 ) {
                alert('Username or email already exists')
                return
            } if ( res.status === 422 ) {
                alert('Invalid Data')
                return
            } if (res.ok) {
                alert('Sign up successful')
                router.push("/signin")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-black' required />
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='text-black' required />
                <label htmlFor="password">Password</label> 
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='text-black' required />
                <label htmlFor="confirmPassword">Confirm Password</label> 
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='text-black' required />
                <button type="submit">Submit</button>
                {password !== confirmPassword && (
                    <span className="text-red-600">Password does not math.</span>
                )}
            </form>
        </div>
    )
}