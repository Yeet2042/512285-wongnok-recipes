"use client"
import { PlusIcon, TrashIcon, PhotoIcon, PencilIcon } from '@heroicons/react/24/solid'
import { Button, Textarea, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

type Props = {
    step: (step: { image?: File | null; title: string }[]) => void
}

export default function AddSteps({ step }: Props) {
    const [steps, setSteps] = useState<{ image?: File | null; title: string }[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddStep = () => {
        setSteps([...steps, { image: null, title: '' }])
    }

    const handleRemoveStep = (index: number) => {
        const newSteps = [...steps]
        newSteps.splice(index, 1)
        setSteps(newSteps)
        step(newSteps)
    }

    const handleRemoveFile = (index: number) => {
        const newSteps = [...steps]
        newSteps[index].image = null
        setSteps(newSteps)
        step(newSteps)
    }

    const handleButton = (index: number) => {
        fileInputRef.current?.click()
        setSelectedIndex(index)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0 && selectedIndex !== null) {
            const selectedFile = files[0]
            const newSteps = [...steps]
            newSteps[selectedIndex].image = selectedFile
            setSteps(newSteps)
            step(newSteps)
        }
    }

    const handleTitleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newSteps = [...steps]
        newSteps[index].title = e.target.value
        setSteps(newSteps)
        step(newSteps)
    }

    useEffect(() => {
        step(steps)
    }, [steps, step])

    return (
        <>
            <h2 className="text-xl font-bold">ขั้นตอนและรูปภาพในการทำ</h2>
            {steps.map((input, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <h3 className="font-bold">ขั้นตอนที่ {index + 1}</h3>
                    <input
                        key={index}
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    {steps[index].image &&
                        <div className="flex flex-col items-center">
                            <div className="w-4/5 flex flex-col gap-4">
                                <div className="bg-neutral-800 rounded-2xl flex justify-center">
                                    <Image height={300} width={300} src={URL.createObjectURL(steps[index].image as Blob)} alt="รูปภาพหน้าปก" />
                                </div>
                                <div className="w-full flex justify-end">
                                    <Dropdown
                                        placement="top-end"
                                    >
                                        <DropdownTrigger>
                                            <Button
                                                variant="flat"
                                                startContent={ <PhotoIcon className="h-5 w-5" /> }
                                                className="w-fit"
                                            >
                                                แก้ไขรูปภาพ
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions">
                                            <DropdownItem
                                                key="เปลี่ยนรูปภาพ"
                                                startContent={ <PhotoIcon className="h-5 w-5" /> }
                                                onPress={() => handleButton(index)}
                                            >
                                                เปลี่ยนรูปภาพ
                                            </DropdownItem>
                                            <DropdownItem 
                                                key="ลบรูป" 
                                                className="text-danger" 
                                                color="danger"
                                                startContent={ <TrashIcon className="h-5 w-5" /> }
                                                onPress={() => handleRemoveFile(index)}
                                            >
                                                ลบรูป
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    
                                </div>
                            </div>
                        </div>
                    }
                    { !steps[index].image && (
                        <Button
                            variant="flat"
                            color="success"
                            startContent={ <PhotoIcon className="h-5 w-5" /> }
                            className="w-fit"
                            onPress={() => handleButton(index)}
                        >
                            เพิ่มรูปภาพ
                        </Button>
                    )}
                    <Textarea 
                        label={`ขั้นตอนที่ ${index + 1}`}
                        value={steps[index].title}
                        onChange={(e) => handleTitleChange(index, e)}
                    />
                    <div className="w-full flex justify-end">
                        <Button
                            color="danger"
                            variant="flat"
                            startContent={<TrashIcon className="h-5 w-5" />}
                            onPress={() => handleRemoveStep(index)}
                            className="w-fit"
                        >
                            ลบ
                        </Button>
                    </div>
                </div>
            ))}
            <Button
                variant="flat"
                color="success"
                startContent={ <PlusIcon className="h-5 w-5" /> }
                className="w-fit"
                onPress={handleAddStep}
            >
                เพิ่มขั้นตอน
            </Button>
        </>
    )
}
