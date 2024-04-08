import { EyeIcon } from '@heroicons/react/24/solid'
import { Button, User } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

type Author = {
    username: string
    role: string
    image: string
}

type Comment = {
    comment: string
    rating: number
}

interface Ingredient {
    name: string;
    quantity: string;
}

type Recipe = {
    id: string
    titleImage: string
    stepImages: string[]
    name: string
    diffculty: string
    time: string
    steps: string[]
    tags: string[]
    viewers: number
    author: Author
    comments: Comment
    ingredients: Ingredient[]
    authorId: string
    createdAt: string
}

type Props = {
    recipeData: Recipe
}

export default function TitleSection({ recipeData }: Props) {
    return (
        <>
            <div className="w-4/5 mt-10 self-center flex flex-col gap-4">
                <div className="bg-neutral-500 bg-opacity-50 rounded-2xl flex justify-center">
                    <Image
                        height={400}
                        width={400}
                        alt={recipeData.name}
                        className=""
                        src={recipeData.titleImage}
                    />
                </div>
                <div className="flex gap-4 justify-between">
                    <div className="flex gap-4 items-center">
                        <Button
                            variant="flat"
                            startContent={ <EyeIcon className="h-4 w-4" /> }
                            className=""
                        >
                            {recipeData.viewers}
                        </Button>
                        <p className="text-sm opacity-50">
                            สร้างเมื่อ {new Date(recipeData.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            radius: "md",
                            src: `${recipeData.author.image}`,
                        }}
                        className="transition-transform"
                        description={recipeData.author.role}
                        name={recipeData.author.username}
                    />
                </div>
                <h1 className="text-3xl font-bold py-5">{recipeData.name}</h1>
                <div>
                    <h2 className="text-xl font-bold">วัตถุดิบ</h2>
                    {recipeData.ingredients.map((ingredient, index) => (
                        <div key={index} className="m-5 w-1/2">
                            <div className="flex justify-between">
                                <div>
                                    {ingredient.name}
                                </div>
                                <div>
                                    {ingredient.quantity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                <h2 className="text-xl font-bold">ขั้นตอนในการทำ</h2>
                    <div className="flex flex-col gap-10">
                        {recipeData.steps.map((steps, index) => (
                            <div key={index} className="m-5">
                                <div className="flex flex-col gap-4">
                                    <div className="bg-default bg-opacity-50 rounded-2xl flex justify-center mx-10">
                                        <Image
                                        height={300}
                                        width={300}
                                        alt={recipeData.name}
                                        className=""
                                        src={recipeData.stepImages[index]}
                                        />
                                    </div>
                                    <p>{steps}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}