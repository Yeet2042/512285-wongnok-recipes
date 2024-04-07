"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import AddTitleImage from './addTitleImage'
import AddIngredients from './addIngredients'
import AddSteps from './addSteps'

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

type Props = {}

export default function Create({}: Props) {
  const { data: session, status } = useSession()

  const [titleImage, setTitleImage] = useState<File | null>(null)
  const [recipeName, setRecipeName] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [time, setTime] = useState("")
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>([])
  const [steps, setSteps] = useState<{ image?: File | null; title: string }[]>([])
  
  const router = useRouter()
  
  useEffect(() => {
      if (status === 'unauthenticated') {
          router.push('/')
      }
  }, [status, router])

  const handleTitleImage = (file: File) => {
    setTitleImage(file)
  }

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value)
  }

  const handleTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(e.target.value)
  }

  const handleIngredients = (ingredients: { name: string; quantity: string }[]) => {
    setIngredients(ingredients)
  }

  const handleStep = (step: { image?: File | null; title: string }[]) => {
    setSteps(step)
  }

  const handleSubmit = async () => {
    if (!titleImage) {
      alert("กรุณาใส่รูปภาพหน้าปก!")
      return
    }
    if (!recipeName) {
      alert("กรุณาใส่ชื่ออาหาร!")
      return
    }
    if (!difficulty) {
      alert("กรุณาเลือกระดับความยาก!")
      return
    }
    if (!time) {
      alert("กรุณาเลือกระยะเวลาในการทำ!")
      return
    }
    if (ingredients.length === 0) {
      alert("กรุณาเพิ่มวัตถุดิบอย่างน้อย 1 ชนิด!")
      return
    }
    if (ingredients.some(ingredient => !ingredient.name || !ingredient.quantity)) {
      alert("กรุณากรอกข้อมูลวัตถุดิบให้ครบถ้วน!")
      return
    }
    if (steps.length === 0) {
      alert("กรุณาเพิ่มขั้นตอนอย่างน้อย 1 ขั้นตอน!")
      return
    }
    if (steps.some(step => !step.title)) {
      alert("กรุณากรอกข้อมูลขั้นตอนการทำให้ครบถ้วน!")
      return
    }
    if (steps.some(step => !step.image)) {
      alert("กรุณาใส่รูปภาพขั้นตอนการทำให้ครบถ้วน!")
      return
    }

    const formData = new FormData();
    formData.append('titleImage', titleImage);
    formData.append('name', recipeName);
    formData.append('difficulty', difficulty);
    formData.append('time', time);
    formData.append('ingredients', JSON.stringify(ingredients));
    if (session?.user.id !== undefined) {
      formData.append('userId', session.user.id);
    }

    const titleSteps = steps.map(step => step.title)
    formData.append('titleSteps', JSON.stringify(titleSteps))    

    steps.forEach((step, index) => {
      if (step.image) {
        formData.append(`step${index + 1}Image`, step.image);
      }
    });

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: formData
      })
      if (res.ok) {
        alert('ok')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    status === 'authenticated' &&
    session.user && (
      <>
        <div className="w-full mx-auto flex flex-col max-w-5xl">
            <div className="flex justify-center">
              <h1 className="p-10 text-2xl font-bold">สร้างสูตรอาหาร</h1>
            </div>
            <div className="flex flex-col p-10 gap-4">
              <AddTitleImage titleImage={handleTitleImage} />
              <Input
                label="ชื่ออาหาร"
                labelPlacement="outside"
                value={recipeName}
                onValueChange={setRecipeName}
              />
              <Select
                labelPlacement="outside"
                label="เลือกระดับความยาก"
                value={[difficulty]}
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
              <Select
                labelPlacement="outside"
                label="เลือกระยะเวลาในการทำ"
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
              <AddIngredients ingredients={handleIngredients} />
              <AddSteps step={handleStep} />
              <div className="flex justify-center">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={handleSubmit}
                >
                  ยืนยันข้อมูล
                </Button> 
              </div>
            </div>
        </div>
      </>
    )
  )
}