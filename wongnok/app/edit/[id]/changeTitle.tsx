import { PhotoIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import Image from 'next/image'
import React, { useState, useRef }  from 'react'

type Props = {
    newImage: (file: File) => void
    refImage: string
}

export default function ChangeTitle({ refImage, newImage }: Props) {
    const [file, setFile] = useState<string | undefined>(undefined)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleButton = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        
        if (files && files.length > 0) {
            const selectedFile = files[0]
            newImage(selectedFile)
            setFile(URL.createObjectURL(selectedFile))
        }
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="w-4/5 flex flex-col gap-4">
                    <div className="bg-default rounded-2xl flex justify-center">
                        <Image height={300} width={300} src={file? file : refImage} alt="รูปภาพหน้าปก" />
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
                                    onPress={handleButton}
                                >
                                    เปลี่ยนรูปภาพ
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </>
    )
}