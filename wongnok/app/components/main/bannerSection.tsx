import React from 'react'

type Props = {}

export default function BannerSection({}: Props) {
    return (
        <>
            <div className="bg-cover bg-center bg-[url('/banner/main.jpg')] h-unit-8xl flex flex-col justify-center">
                <div className="w-full mx-10 sm:mx-auto flex flex-col max-w-5xl py-20 gap-10 drop-shadow-xl">
                    <h1 className="text-6xl sm:text-9xl m-auto">Wongnok Recipes</h1>
                    <p className="text-xl sm:text-3xl">สร้าง และค้นหาเมนูโปรดของคุณ</p>
                </div>
            </div>
        </>
    )
}