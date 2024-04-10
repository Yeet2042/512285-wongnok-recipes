import { Button, Textarea, User } from '@nextui-org/react'
import React from 'react'
import RatingStars from '../ratingStars'
import { TrashIcon } from '@heroicons/react/24/solid'
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
    user: User
    userId: string
    createdAt: string
}

type Props = {
    commentList: Comment[]
}

export default function CommentSection({ commentList }: Props) {
    const { data: session, status } = useSession()
    return (
        commentList && commentList.length > 0 && (
            <>
                {!session?.user && commentList.map((comment, index) => (
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
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {session?.user && commentList.map((comment, index) => (
                    (comment.userId !== session?.user.id) && (
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