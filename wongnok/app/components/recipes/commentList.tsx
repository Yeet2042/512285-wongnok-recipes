import { Button, Textarea, User } from '@nextui-org/react'
import React from 'react'
import RatingStars from '../ratingStars'
import { TrashIcon } from '@heroicons/react/24/solid'

type Props = {}

export default function CommentList({}: Props) {
    return (
        <>
            <div className="w-full mt-10 self-center flex flex-col gap-4">
                <div className="bg-default rounded-2xl bg-opacity-50">
                    <div className="m-5 flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <User
                            avatarProps={{
                                isBordered: true,
                                radius: "md",
                                src: "test",
                            }}
                            className="transition-transform"
                            description="test"
                            name="test"
                            />
                            <div>
                            <RatingStars
                                rating={4}
                                editable={false}
                            />
                            </div>
                        </div>
                        <div>
                            <Textarea isReadOnly defaultValue="test" />
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm opacity-50">แสดงความคิดเห็นเมื่อ {new Date().toLocaleString()}</p>
                            <Button
                                color="danger"
                                variant="flat"
                                startContent={<TrashIcon className="h-5 w-5" />}
                                className="w-fit"
                            >
                                ลบ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
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
        </>
    )
}