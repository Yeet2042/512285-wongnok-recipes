import { Card, CardBody, CardFooter, Image, User} from '@nextui-org/react'
import { CalendarIcon, ChatBubbleLeftRightIcon, EyeIcon, StarIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation'
import React from 'react'

import getColorByDifficulty from '../functions/getColorByDifficulty'
import getColorByTime from '../functions/getColorByTime'
import calculateAverageRating from '../functions/calculateAverageRating';

type Recommend = {
    "คะแนนเฉลี่ยมากที่สุด": Recipe
    "มีคนดูมากที่สุด": Recipe[]
    "ใช้วัตถุดิบน้อยที่สุด": Recipe
    "ใช้ขั้นตอนน้อยที่สุด": Recipe
}

type Recipe = {
    id: string;
    titleImage: string;
    stepImages: string[];
    name: string;
    diffculty: string;
    time: string;
    steps: string[];
    tags: string[];
    viewers: number;
    authorId: string;
    createdAt: string;
}

type Props = {
    recommendItem: Recommend
}

export default function RecommendSection({ recommendItem }: Props) {
    const router = useRouter()

    return (
        <>
            <div className="container">
            <h1 className="text-2xl font-bold text-center sm:text-left">แนะนำสำหรับคุณ</h1>
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 pt-10 mx-4 sm:mx-auto">
                    {Object.entries(recommendItem).map(([key, recipe], index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <h2 className="self-center text-lg sm:text-xl font-bold">{key}</h2>
                            <div>
                                <div className="absolute z-10 space-y-2">
                                    <div className={`w-fit p-2 font-bold rounded-xl shadow-lg bg-opacity-80 ${getColorByDifficulty(recipe.diffculty)}`}>
                                        {recipe.diffculty}
                                    </div>
                                    <div className={`w-fit p-2 font-bold rounded-xl shadow-lg bg-opacity-80 ${getColorByTime(recipe.time)}`}>
                                        {recipe.time}
                                    </div>
                                </div>
                                <div className="m-2">
                                    <Card onPress={() => router.push(`/recipes/${recipe.id}`)} shadow="sm" isPressable className="z-0 w-full">
                                        <CardBody className="overflow-visible p-0">
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={recipe.name}
                                                className="w-full object-cover h-[140px]"
                                                src={recipe.titleImage}
                                            />
                                        </CardBody>
                                        <CardFooter>
                                            <div className=" m-5 w-full flex flex-col gap-4">
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-left">{calculateAverageRating(recipe.comments)}</p>
                                                    <StarIcon className="h-8 w-8 text-yellow-500" />
                                                </div>
                                                <h1 className="text-2xl font-bold text-left">{recipe.name}</h1>
                                                <div className="flex my-5">
                                                    <User
                                                        avatarProps={{
                                                            isBordered: true,
                                                            radius: "md",
                                                            src: `${recipe.author.image}`,
                                                        }}
                                                        className="transition-transform"
                                                        description={recipe.author.role}
                                                        name={recipe.author.username}
                                                    />
                                                </div>
                                                <div className="flex flex-col items-end gap-4">
                                                    <div className="flex items-center justify-center">
                                                        <CalendarIcon className="h-6 w-6"/>
                                                        <p className="ml-1 text-sm">{recipe.createdAt.slice(0, 10)}</p>
                                                    </div>
                                                    <div className="flex justify-end gap-4">
                                                        <div className="flex items-center justify-center">
                                                            <EyeIcon className="h-6 w-6"/>
                                                            <p className="ml-1 text-sm">{recipe.viewers}</p>
                                                        </div>
                                                        <div className="flex items-center justify-center">
                                                            <ChatBubbleLeftRightIcon className="h-6 w-6"/>
                                                            <p className="ml-1 text-sm">{recipe.comments?.length ? recipe.comments.length : "0"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}