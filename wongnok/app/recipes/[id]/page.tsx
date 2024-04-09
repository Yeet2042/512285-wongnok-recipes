"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import TitleSection from '@/app/components/recipes/titleSection'
import CommentSection from '@/app/components/recipes/commentSection'
import SendComment from '@/app/components/recipes/sendComment'

type Props = {}

export default function Page({}: Props) {
    const params = useParams()
    const recipeId = params.id
    const { data: session, status } = useSession()

    const [recipe, setRecipe] = useState()
    const [commentList, setCommentList] = useState([])
    const [showSendCommand, setShowSendCommand] = useState(false)

    const [comment, setComment] = useState()


    const fetchData = async () => {
        try {
            const [ recipeRes, commentListRes ] = await Promise.all([
                fetch(`/api/recipes/${recipeId}`),
                fetch(`/api/comments/${recipeId}`),
            ]);
        
            const recipeData = await recipeRes.json();
            const commentListData = await commentListRes.json();
        
            setRecipe(recipeData.recipe)
            setCommentList(commentListData.comments)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    useEffect(() => {
        if (commentList.some(comment => comment.userId === session?.user.id)) {
            setShowSendCommand(false)
        } else {
            setShowSendCommand(true)
        }
    },[commentList, session?.user.id])    

    const handleOnSendComment = async (comment: string, rating: number) => {
        try {
            const res = await fetch(`/api/comments/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session?.user.id,
                    comment: comment,
                    rating: rating,
                }),
            })
            if (res.ok) {
                fetchData()
            } else {
                console.error("Comment failed")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (commentId: string) => {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session?.user.id,
            }),
        })
        if (res.ok) {
            fetchData()
        } else {
            console.error("Delete failed")
        }
    }
    
    return (
        recipe && commentList.length > 0 && (
            <>
                <div className="w-full mx-auto flex flex-col max-w-5xl my-10">
                    <TitleSection recipeData={recipe} />
                    <div className="w-4/5 flex flex-col mx-auto pt-20 gap-4">
                        <h2 className="text-2xl font-bold">ความคิดเห็นทั้งหมด {commentList.length} รายการ</h2>
                        {!session?.user && (
                            <p>กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น</p>
                        )}
                    </div>
                    <SendComment commentList={commentList} onSendComment={handleOnSendComment} onSendDelete={handleDelete} showButton={showSendCommand} />
                    <CommentSection commentList={commentList} />
                </div>
            </>
        )
    )
}