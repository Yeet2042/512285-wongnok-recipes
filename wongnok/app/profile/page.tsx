'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Avatar, Card, CardBody, CardFooter, Image, User } from '@nextui-org/react'
import { CalendarIcon, ChatBubbleLeftRightIcon, EyeIcon, StarIcon } from '@heroicons/react/24/solid';

import getColorByDifficulty from '../components/functions/getColorByDifficulty'
import getColorByTime from '../components/functions/getColorByTime'
import calculateAverageRating from '../components/functions/calculateAverageRating'


export default function Profile() {
    const { data: session, status } = useSession()
    const [recipes, setRecipes] = useState([])
    
    const router = useRouter()

    const fetchData = async () => {
        try {
            const [ recipesRes ] = await Promise.all([
                fetch(`/api/user/${session?.user.id}`),
            ]);
        
            const recipesData = await recipesRes.json();
        
            setRecipes(recipesData.userRecipes)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [status, router])

    useEffect(() => {
        if (session?.user.id) {
            fetchData()
        }
    }, [session?.user.id])

    console.log(recipes)
    
    return (
        status === 'authenticated' &&
        session.user && 
        recipes && (
            <>
                <div className="w-full mx-auto flex flex-col max-w-5xl my-20">
                    <div className="container flex justify-center p-10">
                        <Avatar
                            isBordered
                            src={session.user.image}
                            radius="full"
                            className="h-32 w-32"
                        />
                        <div className="ml-14">
                            <h1 className="text-2xl font-bold ">{session.user.username}</h1>
                            <p>{session.user.role}</p>
                            <div className="m-5">
                                <p>{recipes.length} สูตรอาหารทั้งหมด</p>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">สูตรอาหารของฉัน</h1>
                    <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 pt-10">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="flex flex-col gap-4">
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
                                                    className="w-full object-cover h-[200px]"
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
    )
}