"use client"
import { PlusIcon } from '@heroicons/react/24/solid'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}


export default function CreateRecipeButton({}: Props) {
  const router = useRouter()

  const handleButton = () => {
    router.push("/create")
  }

  return (
    <Button
        color="success" 
        variant="flat"
        startContent={ <PlusIcon className="h-5 w-5"/> }
        onPress={handleButton}
    >
        สร้างสูตร
    </Button>
  )
}