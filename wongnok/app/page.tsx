"use client"

import React, { useEffect, useState } from 'react'

import BannerSection from './components/main/bannerSection';
import CategorySection from './components/main/categorySection';
import RecommendSection from './components/main/recommendSection';
import LatestSection from './components/main/latestSection';

type Props = {}

type Category = {
  title: string
  image: string
  href: string
}

type Recommend = {
  "คะแนนเฉลี่ยมากที่สุด": Recipe
  "มีคนดูมากที่สุด": Recipe[]
  "ความคิดเห็นมากที่สุด": Recipe
  "ใช้วัตถุดิบน้อยที่สุด": Recipe
  "ใช้ขั้นตอนน้อยที่สุด": Recipe
}

type Recipe = {
  id: string;
  titleImage: string;
  stepImages: string[];
  name: string;
  diffculty: string;
  time: string;
  steps: string[];
  tags: string[];
  viewers: number;
  authorId: string;
  createdAt: string;
}

export default function Page({}: Props) {
  const [category, setCategory] = useState<Category[]>([])
  const [recommend, setRecommend] = useState<Recommend>({})
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ category, recommend, recipes ] = await Promise.all([
          fetch("/api/category"),
          fetch("/api/recommend"),
          fetch("/api/recipes"),
        ])
        const categoryData = await category.json()
        const recommendData = await recommend.json()
        const recipesData = await recipes.json()

        setCategory(categoryData.categorys)
        setRecommend(recommendData)
        setRecipes(recipesData.recipes)

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <BannerSection />
      <div className="w-full mx-auto flex flex-col max-w-5xl py-20 space-y-10">
        <CategorySection categoryItems={category} />
        <RecommendSection recommendItem={recommend} />
        <LatestSection latestItem={recipes} />
      </div>
    </>
  )
}