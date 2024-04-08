import { Button, Textarea, User } from '@nextui-org/react'
import React from 'react'
import RatingStars from '../ratingStars'
import { useSession } from 'next-auth/react'

type User = {
    username: string
    role: string
    image: string
}

type Comment = {
    id: string
    comment: string
    rating: number
    createdAt: string
    user: User
}

type Props = {
    commentList: Comment[]
}

export default function CommentSection({ commentList }: Props) {
    const { data: session, status } = useSession()
    return (
        <>
            <div className="w-full mt-10 self-center flex flex-col gap-4">
                {commentList.map((comment, index) => (
                    <div key={index} className="bg-default rounded-2xl bg-opacity-50">
                        <div className="m-5 flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <User
                                avatarProps={{
                                    isBordered: true,
                                    radius: "md",
                                    src: `${commentList[index].user.image}`,
                                }}
                                className="transition-transform"
                                description={commentList[index].user.role}
                                name={commentList[index].user.username}
                                />
                                <div>
                                <RatingStars
                                    rating={commentList[index].rating}
                                    editable={false}
                                />
                                </div>
                            </div>
                            <div>
                                <Textarea isReadOnly defaultValue={commentList[index].comment} />
                            </div>
                            <div className="text-sm opacity-50">
                                <p>แสดงความคิดเห็นเมื่อ {new Date(commentList[index].createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}