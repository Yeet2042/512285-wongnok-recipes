import React from 'react'
import { useSession } from 'next-auth/react';

type Props = {}

export default function ProfileNav({}: Props) {
    const { data: session, status } = useSession()

    return (
        status === 'authenticated' &&
        session.user && (
        <>
            <p>{session.user.username}</p>
        </>
        )
    )
}