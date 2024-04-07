"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Avatar, Button, User } from '@nextui-org/react'
import { EyeIcon } from '@heroicons/react/24/solid'

interface Ingredient {
  name: string;
  quantity: string;
}

interface Commend {

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
  commends: Commend[];
  authorId: string;
  createdAt: Date;
}



type Props = {}

export default function Page({}: Props) {
  const { data: session, status } = useSession()
  const params = useParams()

  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ recipe ] = await Promise.all([
          fetch(`/api/recipes/${params.id}`),
        ])
        const recipeData = await recipe.json()

        setRecipe(recipeData.recipe)

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [params.id])

  return (
    status === 'authenticated' &&
    session.user && (
      <div className="w-full mx-auto flex flex-col max-w-5xl">
        {recipe && (
          <>
            <div className="w-4/5 flex flex-col gap-5 self-center my-10">
              <div className="bg-neutral-500 bg-opacity-50 rounded-2xl flex justify-center">
                <Image
                  height={400}
                  width={400}
                  alt={recipe.name}
                  className=""
                  src={recipe.titleImage}
                />
              </div>
              <div className="flex gap-4 justify-between">
                <Button
                  variant="flat"
                  startContent={ <EyeIcon className="h-4 w-4" /> }
                  className=""
                >
                  {recipe.viewers}
                </Button>
                <User
                  as="button"
                  avatarProps={{
                      isBordered: true,
                      radius: "md",
                      src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description={session.user.role}
                  name={session.user.username}
                />
              </div>
              <h1 className="text-3xl font-bold pt-8">{recipe.name}</h1>
              <div>
                
              </div>
              <div>
                <h2 className="text-xl font-bold">วัตถุดิบ</h2>
                { recipe.ingredients.map((ingredient, index) => (
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
                  { recipe.steps.map((steps, index) => (
                    <div key={index} className="m-5">
                      <div className="flex flex-col gap-4">
                        <div className="bg-neutral-500 bg-opacity-50 rounded-2xl flex justify-center mx-10">
                          <Image
                            height={300}
                            width={300}
                            alt={recipe.name}
                            className=""
                            src={recipe.stepImages[index]}
                          />
                        </div>
                        <p>{steps}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">{recipe.commends?.length ? recipe.commends.length : "0"} ความคิดเห็น</h1>
                <div className="bg-neutral-500 rounded-2xl bg-opacity-50">
                  <div className="m-4">
                    <div className="flex justify-between">
                      <User
                        avatarProps={{
                            isBordered: true,
                            radius: "md",
                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                        }}
                        className="transition-transform"
                        description={session.user.role}
                        name={session.user.username}
                      />
                      <div>
                        THIS IS RATING
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  )
}