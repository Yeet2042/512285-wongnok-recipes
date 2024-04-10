"use client"
import { useSession } from 'next-auth/react'
import { redirect, useParams } from 'next/navigation'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState, useEffect, useRef, use }  from 'react'
import { PencilIcon, PhotoIcon } from '@heroicons/react/24/solid'

import ChangeTitle from './changeTitle'
import ChangeIngredients from './changeIngredients'
import ChangeSteps from './changeSteps'

const difficultys = [
    { value: "easy", label: "ง่าย", color: "success" },
    { value: "medium", label: "ปานกลาง", color: "warning" },
    { value: "hard", label: "ยาก", color: "danger" },
]
  
const times = [
    { value: "5-10min", label: "5 - 10 นาที", color: "default" },
    { value: "11-30min", label: "11 - 30 นาที", color: "success" },
    { value: "31-60min", label: "31 - 60 นาที", color: "warning" },
    { value: "60+min", label: "60+ นาที", color: "danger" },
]

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

type Props = {}

export default function Page({}: Props) {
    const params = useParams()
    const recipeId = params.id
    const { data: session, status } = useSession()

    const [recipe, setRecipe] = useState<Recipe>()

    const [newTitleImage, setNewTitleImage] = useState<File | null>(null)
    const [newRecipeName, setNewRecipeName] = useState<string | null>(null)
    const [newDiff, setNewDiff] = useState<string | null>(null)
    const [newTime, setNewTime] = useState<string | null>(null)
    const [newIngredients, setNewIngredients] = useState<Ingredient[] | null >(null)
    const [newSteps, setNewSteps] = useState<{ image?: File | null; title: string }[]>([])

    const fetchData = async () => {
        try {
            const [ recipeRes ] = await Promise.all([
                fetch(`/api/recipes/${recipeId}`),
            ]);
        
            const recipeData = await recipeRes.json();
        
            setRecipe(recipeData.recipe)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    },[])
    
    if (recipe && recipe?.authorId !== session?.user.id) {
        redirect("/")
    }

    const handleNewImage = (file: File) => {
        setNewTitleImage(file)
    }

    const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewDiff(e.target.value)
    }

    const handleTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewTime(e.target.value)
    }
    const handleNewIngredients = (ingredients: Ingredient[]) => {
        setNewIngredients(ingredients)        
    }
    
    const handleNewSteps = (step: { step: { image?: File | null; title: string }[] }) => {
        setNewSteps(step)
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('recipeId', recipe?.id)
        formData.append('authorId', session?.user.id)
        formData.append('newTitleImage', newTitleImage)
        formData.append('newRecipeName', newRecipeName)
        formData.append('newDiff', newDiff)
        formData.append('newTime', newTime)
        formData.append('newIngredients', JSON.stringify(newIngredients))

        const newTitleSteps = newSteps.map(step => step.title)
        formData.append('newTitleSteps', JSON.stringify(newTitleSteps))

        newSteps.forEach((step, index) => {
            if (step.image) {
                formData.append(`step${index + 1}Image`, step.image);
            }
        })

        try {
            const res = await fetch("/api/recipes", {
                method: "PUT",
                body: formData
            })
            if (res.ok) {
                alert('อัพเดทข้อมูลเรียบร้อย')
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    

    return (
        recipe && (
            <>
                <div className="w-full mx-auto flex flex-col max-w-5xl">
                    <div className="flex justify-center">
                        <h1 className="p-10 text-2xl font-bold">แก้ไขสูตรอาหาร</h1>
                    </div>
                    <div className="flex flex-col p-10 gap-4">
                        <div>
                            <div className="flex gap-4 items-center">
                                <h2 className="text-xl font-bold">รูปภาพหน้าปก</h2>
                                {newTitleImage && (
                                    <p className="text-danger text-sm">มีการเปลี่ยนแปลง</p>
                                )}
                            </div>
                            <ChangeTitle refImage={recipe.titleImage} newImage={handleNewImage} />
                        </div>
                        <div>
                            {newRecipeName && (
                                <p className="text-danger text-sm">มีการเปลี่ยนแปลง</p>
                            )}
                            <Input
                                label="ชื่ออาหาร"
                                labelPlacement="outside"
                                placeholder={recipe.name}
                                value={newRecipeName}
                                onValueChange={setNewRecipeName}
                            />
                        </div>
                        <div>
                            {newDiff && (
                                <p className="text-danger text-sm">มีการเปลี่ยนแปลง</p>
                            )}
                            <Select
                                labelPlacement="outside"
                                label="เลือกระดับความยาก"
                                value={[newDiff]}
                                placeholder={recipe.diffculty}
                                onChange={handleDifficulty}
                            >
                                {difficultys.map((difficulty) => (
                                    <SelectItem 
                                        variant="flat"
                                        key={difficulty.value}
                                        value={difficulty.value}
                                        color={difficulty.color}
                                    >
                                        {difficulty.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            {newTime && (
                                <p className="text-danger text-sm">มีการเปลี่ยนแปลง</p>
                            )}
                            <Select
                                labelPlacement="outside"
                                label="เลือกระยะเวลาในการทำ"
                                value={[newTime]}
                                placeholder={recipe.time}
                                onChange={handleTime}
                            >
                                {times.map((time) => (
                                    <SelectItem 
                                        variant="flat"
                                        key={time.value}
                                        value={time.value}
                                        color={time.color}
                                    >
                                        {time.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <div className="flex gap-4 items-center">
                                <h2 className="text-xl font-bold">วัตถุดิบ</h2>
                                {newIngredients && (
                                    <p className="text-danger text-sm">มีการเปลี่ยนแปลง</p>
                                )}
                            </div>
                            <ChangeIngredients refIngredients={recipe.ingredients} onUpdateNewIngredientList={handleNewIngredients} />
                        </div>
                        <div>
                            <ChangeSteps step={handleNewSteps} />
                        </div>
                        <div className="self-center">
                            <Button
                                color="danger"
                                variant="flat"
                                onClick={handleSubmit}
                                startContent={ <PencilIcon className="h-4 w-4" /> }
                                className=""
                            >
                                    ยืนยันการแก้ไข
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}