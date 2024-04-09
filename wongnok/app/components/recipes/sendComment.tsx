import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button, Textarea, User } from '@nextui-org/react'
import RatingStars from '../ratingStars'
import { PaperAirplaneIcon, TrashIcon } from '@heroicons/react/24/solid'

type User = {
    username: string
    role: string
    image: string
}

type Comment = {
    id: string
    comment: string
    rating: number
    user: User
    userId: string
    createdAt: string
}

type Props = {
    commentList: Comment[]
    onSendComment: (comment: string, rating: number) => void
    onSendDelete: (commentId: string) => void
    showButton: boolean
}

export default function SendComment({ commentList, onSendComment, onSendDelete, showButton }: Props) {
    const { data: session, status } = useSession()

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)

    const handleRatingChange = (newRating: number) => {
        setRating(newRating)
    }

    const handleSendCommend = () => {
        onSendComment(comment, rating)
    }
    
    return (
        commentList && 
        session?.user && (
            <>
                {showButton && (
                    <div className="w-4/5 self-center mt-10 bg-default rounded-2xl bg-opacity-50">
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
                            {comment !== "" && rating !== 0 && (
                                <Button 
                                    className="w-fit self-end"
                                    startContent={ <PaperAirplaneIcon className="h-4 w-4" /> }
                                    variant="flat"
                                    color="success"
                                    onPress={handleSendCommend}
                                >
                                    ส่งความคิดเห็น
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                {session?.user && !showButton && commentList.map((comment, index) => (
                    (comment.userId === session?.user.id) && (
                        <div key={index} className="w-4/5 mt-10 self-center flex flex-col gap-4">
                            <div className="bg-default rounded-2xl bg-opacity-50">
                                <div className="m-5 flex flex-col gap-4">
                                    <div className="flex gap-4 items-center">
                                        <User
                                        avatarProps={{
                                            isBordered: true,
                                            radius: "md",
                                            src: `${comment.user.image}`,
                                        }}
                                        className="transition-transform"
                                        description={comment.user.role}
                                        name={comment.user.username}
                                        />
                                        <div>
                                        <RatingStars
                                            rating={comment.rating}
                                            editable={false}
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <Textarea isReadOnly defaultValue={comment.comment} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm opacity-50">แสดงความคิดเห็นเมื่อ {new Date(comment.createdAt).toLocaleString()}</p>
                                        <Button
                                            color="danger"
                                            variant="flat"
                                            startContent={<TrashIcon className="h-5 w-5" />}
                                            className="w-fit"
                                            onPress={() => onSendDelete(comment.id)}
                                        >
                                            ลบ
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </>
        )
    )
}