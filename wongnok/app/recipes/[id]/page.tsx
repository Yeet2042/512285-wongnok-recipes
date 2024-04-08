"use client"
import React, { use, useCallback, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Avatar, Button, Textarea, User } from '@nextui-org/react'
import { EyeIcon, PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid'

import TitleSection from '@/app/components/recipes/titleSection'
import CommentSection from '@/app/components/recipes/commentSection'

import RatingStars from '@/app/components/ratingStars'



interface Ingredient {
  name: string;
  quantity: string;
}

interface Comment {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  userId: string;
}

interface Recipe {
  id: string;
  titleImage: string;
  stepImages: JSON;
  name: string;
  diffculty: string;
  time: string;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  viewers: number;
  comments: Comment[];
  authorId: string;
  createdAt: Date;
}

type Props = {}

export default function Page({}: Props) {
  const { data: session, status } = useSession()
  const params = useParams()

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [showSendComment, setShowSendComment] = useState(true)

  const [comment, setComment] = useState("")
  const [rating, setRating] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const [recipeRes, commentRes] = await Promise.all([
        fetch(`/api/recipes/${params.id}`),
        fetch(`/api/comments/${params.id}`),
      ]);
  
      const recipeData = await recipeRes.json();
      const commentData = await commentRes.json();
  
      setRecipe(recipeData.recipe);
      setComments(commentData.comments);
    } catch (error) {
      console.error(error);
    }
  }, [params.id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (comments.some(comment => comment.userId === session?.user.id)) {
      setShowSendComment(false);
    } else {
      setShowSendComment(true);
    }
  }, [comments, session?.user.id])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleSendCommend = async () => {
    if (comment !== "" && rating !== null) {
      const res = await fetch(`/api/comments/${recipe?.id}`, {
        method: "POST",
        body: JSON.stringify({
          comment,
          rating,
          userId: session?.user.id
        })
      })
      if (res.ok) {
        fetchData()
      }
    }
  }
  
  const handleDeleteComment =async (commentId: string) => {
    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      body: JSON.stringify({
        userId: session?.user.id
      })
    });
    if (res.ok) {
      fetchData()
    }
  }  

  return (
    <div className="w-full mx-auto flex flex-col max-w-5xl">
      {recipe && (
        <>
          <TitleSection recipeData={recipe} />
          <div className="w-4/5 flex flex-col gap-5 self-center my-10">
            <h1 className="text-2xl font-bold">{comments.length} ความคิดเห็น</h1>
            <div className="flex flex-col gap-4">
              {showSendComment && (
                <div className="bg-default rounded-2xl bg-opacity-50">
                  <div className="m-4 flex flex-col gap-4">
                    <h2 className="text-xl font-bold">แสดงความคิดเห็น</h2>
                    <div className="flex gap-4 items-center">
                      <Textarea 
                        placeholder="ความคิดเห็นของคุณ"
                        value={comment}
                        onValueChange={setComment}
                      />
                    </div>
                    <h2 className="text-xl font-bold">ให้คะแนน</h2>
                    <RatingStars rating={rating} onRatingChange={handleRatingChange} editable={true}/>
                    {comment !== "" && rating !== null && (
                      <Button 
                        className="w-fit self-end"
                        startContent={ <PaperAirplaneIcon className="h-4 w-4" /> }
                        variant="flat"
                        color="success"
                        onPress={handleSendCommend}
                      >ส่งความคิดเห็น</Button>
                    )}
                  </div>
                </div>
              )}
              <CommentSection commentList={comments} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}