import Link from 'next/link'
import React from 'react'
import {Card, CardBody, CardFooter, Image, Avatar} from "@nextui-org/react";
import { CalendarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

type Props = {}

const category = [
  {
    title: "อาหารเหนือ",
    img: "",
  },
  {
    title: "อาหารกลาง",
    img: "",
  },
  {
    title: "อาหารอีสาน",
    img: "",
  },
  {
    title: "อาหารใต้",
    img: "",
  },  
]
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

export default function page({}: Props) {
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
              <Card shadow="sm" key={index}>
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
            ))}
          </div>
        </div>
        <div className="container">
          <h1 className="text-2xl font-bold">แนะนำสำหรับคุณ</h1>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 pt-10">
            {recommend.map((item, index) => (
              <div key={index}>
                <div className="absolute z-10 bg-red-500 p-2 font-bold rounded-xl shadow-lg">
                  {item.title}
                </div>
                <div className="m-2">
                  <Card shadow="sm">
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
            {latest.map((item, index) => (
              <div key={index}>
                <div className="absolute z-10 space-y-2">
                  <div className="bg-red-500 p-2 font-bold rounded-xl shadow-lg">
                    {item.diffculty}
                  </div>
                  <div className="w-fit bg-red-500 p-2 font-bold rounded-xl shadow-lg">
                    {item.time}
                  </div>
                </div>
                <div className="m-2">
                  <Card shadow="sm">
                    <CardBody className="overflow-visible p-0">
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={item.name}
                        className="w-full object-cover h-[140px]"
                        src=""
                      />
                    </CardBody>
                    <CardFooter>
                      <div className=" m-5 w-full flex flex-col">
                        <h1 className="text-2xl font-bold">{item.name}</h1>
                        <div className="flex my-5">
                          <Avatar radius="md" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                          <div className="flex items-center ml-4">
                            <p>test</p>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-6 w-6"/>
                            <p className="ml-1 text-sm">12/06/67</p>
                          </div>
                          <div className="flex items-center">
                            <ChatBubbleLeftRightIcon className="h-6 w-6"/>
                            <p className="ml-1 text-sm">1234</p>
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