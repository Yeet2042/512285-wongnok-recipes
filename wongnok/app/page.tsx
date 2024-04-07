"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession} from 'next-auth/react'
import {Card, CardBody, CardFooter, Image, Avatar, User} from "@nextui-org/react";
import { CalendarIcon, ChatBubbleLeftRightIcon, EyeIcon } from '@heroicons/react/24/solid';

type Props = {}

interface Category {
  title: string;
  image: string;
}

interface Commend {

}

interface Recipes {
    id: string;
    titleImage: string;
    stepImages: JSON;
    name: string;
    diffculty: string;
    time: string;
    steps: string[];
    tags: string[];
    viewers: number;
    comments: Commend[];
    authorId: string;
    createdAt: Date;
}

const recommend = [
  {
    title: "ดาวเฉลี่ยมากที่สุด",
    img: "",
  },
  {
    title: "มีคนดูมากที่สุด",
    img: "",
  },
  {
    title: "ความคิดเห็นมากที่สุด",
    img: "",
  },
  {
    title: "ใช้เวลาทำน้อยที่สุด",
    img: "",
  },
  {
    title: "ใช้วัตถุดิบน้อยที่สุด",
    img: "",
  },
  {
    title: "ใช้ขั้นตอนน้อยที่สุด",
    img: "",
  },
]

const latest = [
  {
    name: "Noodle",
    diffculty: "Easy",
    time:10,
    authorId: "660eeacd6a7c446070606940",
    createdAt: "2024-04-05T20:46:23.938+00:00"
  },
  {
    name: "Rice",
    diffculty: "Medium",
    time:30,
    authorId: "660eeacd6a7c446070606940",
    createdAt: "2024-04-06T20:46:23.938+00:00"
  },
  {
    name: "Steak",
    diffculty: "Hard",
    time:40,
    authorId: "660eeacd6a7c446070606940",
    createdAt: "2024-04-07T20:46:23.938+00:00"
  },
]

function getColorByDifficulty(difficulty: string) {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'hard':
      return 'bg-red-500';
    default:
      return '';
  }
}

export default function Page({}: Props) {
  const router = useRouter()

  const [category, setCategory] = useState<Category[]>([])
  const [recipes, setRecipes] = useState<Recipes[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ category, recipes ] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/recipes"),
        ])
        const categoryData = await category.json()
        const recipesData = await recipes.json()

        setCategory(categoryData.categorys)
        setRecipes(recipesData.recipes)

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  
  return (
    <>
      <div className="bg-gray-400 h-unit-8xl flex items-center justify-center text-9xl">
          THIS IS BANNER
      </div>
      <div className="w-full mx-auto flex flex-col max-w-5xl py-20 space-y-10">
        <div className="container">
          <h1 className="text-2xl font-bold">หมวดหมู่อาหารยอดนิยม</h1>
          <div className="gap-20 grid grid-cols-2 sm:grid-cols-4 pt-10">
            {category.map((item, index) => (
              <Card shadow="sm" key={index} isPressable className="w-full">
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="font-bold justify-center">
                  <b>{item.title}</b>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="container">
          <h1 className="text-2xl font-bold">แนะนำสำหรับคุณ</h1>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 pt-10">
            {recommend.map((item, index) => (
              <div key={index}>
                <div className="absolute z-10 bg-red-500 p-2 font-bold rounded-xl shadow-lg bg-opacity-50">
                  {item.title}
                </div>
                <div className="m-2">
                  <Card shadow="sm" isPressable className="w-full">
                    <CardBody className="overflow-visible p-0">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={item.title}
                        className="w-full object-cover h-[140px]"
                        src={item.img}
                      />
                    </CardBody>
                    <CardFooter className="font-bold justify-center">
                      <b>{item.title}</b>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <h1 className="text-2xl font-bold">สูตรอาหารล่าสุด</h1>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 pt-10">
            {recipes.map((item, index) => (
              <div key={index}>
                <div className="absolute z-10 space-y-2">
                  <div className={`p-2 font-bold rounded-xl shadow-lg w-fit bg-opacity-50 ${getColorByDifficulty(item.diffculty)}`}>
                    {item.diffculty}
                  </div>
                  <div className="w-fit bg-red-500 p-2 font-bold rounded-xl shadow-lg bg-opacity-50">
                    {item.time}
                  </div>
                </div>
                <div className="m-2">
                  <Card onPress={() => router.push(`/recipes/${item.id}`)} shadow="sm" isPressable className="z-0 w-full">
                    <CardBody className="overflow-visible p-0">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={item.name}
                        className="w-full object-cover h-[140px]"
                        src={item.titleImage}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className=" m-5 w-full flex flex-col">
                        <h1 className="text-2xl font-bold text-left">{item.name}</h1>
                        <div className="flex my-5">
                          <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                radius: "md",
                                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                            }}
                            className="transition-transform"
                            description="test"
                            name="test"
                          />
                        </div>
                        <div className="flex justify-end space-x-4">
                          <div className="flex items-center justify-center">
                            <CalendarIcon className="h-6 w-6"/>
                            <p className="ml-1 text-sm">{item.createdAt.slice(0, 10)}</p>
                          </div>
                          <div className="flex items-center justify-center">
                            <EyeIcon className="h-6 w-6"/>
                            <p className="ml-1 text-sm">{item.viewers}</p>
                          </div>
                          <div className="flex items-center justify-cente">
                            <ChatBubbleLeftRightIcon className="h-6 w-6"/>
                            <p className="ml-1 text-sm">{item.comments?.length ? item.comments.length : "0"}</p>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}