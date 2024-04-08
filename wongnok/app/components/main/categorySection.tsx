import { Card, CardBody, CardFooter, Image} from '@nextui-org/react'
import React from 'react'

type Category = {
    title: string
    image: string
    href: string
}

type Props = {
    categoryItems: Category[]
}

export default function CategorySection({ categoryItems }: Props) {
    return (
        <>
            <div className="container">
            <h1 className="text-2xl font-bold">หมวดหมู่อาหารยอดนิยม</h1>
                <div className="gap-20 grid grid-cols-2 sm:grid-cols-4 pt-10">
                    {categoryItems.map((category, index) => (
                    <Card shadow="sm" key={index} isPressable className="w-full">
                        <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={category.title}
                            className="w-full object-cover h-[140px]"
                            src={category.image}
                        />
                        </CardBody>
                        <CardFooter className="font-bold justify-center">
                        <b>{category.title}</b>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
            </div>
        </>
    )
}