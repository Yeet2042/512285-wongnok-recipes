import { MagnifyingGlassIcon, StarIcon, CalendarIcon, EyeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardFooter, User, card } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import getColorByDifficulty from '../functions/getColorByDifficulty'
import getColorByTime from '../functions/getColorByTime'
import calculateAverageRating from '../functions/calculateAverageRating';


type Props = {}

export default function SearchBar({}: Props) {
    const router = useRouter()

    const [searchList, setSearchList] = useState([])
    const [search, setSearch] = useState("")
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const fetchData = async (searchTerm: string) => {
        try {
            const [searchsRes] = await Promise.all([
                fetch(`/api/search/${searchTerm}`),
            ]);
        
            const searchsData = await searchsRes.json();
        
            setSearchList(searchsData.searchList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (search !== "") {
            fetchData(search)
        }
    },[search])

    return (
        <>
            <Button
                onClick={onOpen}
                variant="flat"
                startContent={ <MagnifyingGlassIcon className="h-6 w-6" /> }
                className="max-w-5xl"
            >
                <p className="opacity-50">ค้นหาสูตรอาหาร</p>
            </Button>
            <Modal
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="center"
                hideCloseButton={true}
                className="max-w-xl h-1/2"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader
                                className="flex flex-col gap-4 m-4"
                            >
                                <h1 className="text-xl">ค้นหาสูตรอาหาร</h1>
                                <Input 
                                    placeholder="ชื่ออาหาร"
                                    variant="flat"
                                    startContent={ <MagnifyingGlassIcon className="h-6 w-6" /> }
                                    value={search}
                                    onValueChange={setSearch}
                                />
                            </ModalHeader>
                            <ModalBody className="overflow-auto">
                                {searchList.length > 0 &&
                                searchList.map((search, index) => (
                                    <div key={index} >
                                        <Button 
                                            variant="flat"
                                            className="flex gap-4 w-full h-fit justify-between"
                                            onPress={() => {
                                                router.push(`/recipes/${search._id.$oid}`)
                                                onClose()
                                            }}
                                        >
                                            <div className="flex">
                                                <Image
                                                    height={100}
                                                    width={100}
                                                    src={search.titleImage}
                                                    alt="รูปภาพหน้าปก" 
                                                    className="my-4 rounded-xl"
                                                />
                                                <div className="flex flex-col items-start self-start m-4 gap-4">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex items-center">
                                                            <p className="text-2xl font-bold text-left">{calculateAverageRating(search.comments)}</p>
                                                            <StarIcon className="h-8 w-8 text-yellow-500" />
                                                        </div>
                                                        <h1 className="text-xl font-bold">{search.name}</h1>
                                                    </div>
                                                    <User
                                                        avatarProps={{
                                                            isBordered: true,
                                                            radius: "md",
                                                            src: `${search.author[0].image}`,
                                                        }}
                                                        className="transition-transform"
                                                        description={search.author[0].role}
                                                        name={search.author[0].username}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-col self-end m-3 gap-3">
                                                <div className="flex items-center justify-center">
                                                    <CalendarIcon className="h-6 w-6"/>
                                                    <p className="ml-1 text-sm">{search.createdAt.$date.slice(0, 10)}</p>
                                                </div>
                                                <div className="flex justify-end gap-4">
                                                    <div className="flex items-center justify-center">
                                                        <EyeIcon className="h-6 w-6"/>
                                                        <p className="ml-1 text-sm">{search.viewers}</p>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <ChatBubbleLeftRightIcon className="h-6 w-6"/>
                                                        <p className="ml-1 text-sm">{search.comments?.length ? search.comments.length : "0"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                ))}
                            </ModalBody>
                            <ModalFooter>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}