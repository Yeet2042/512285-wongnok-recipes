import { promises as fsPromises } from 'fs'
import path from 'path'
import { getPrismaClient } from "@/app/components/prismaClient"

import fileUploader from '@/app/components/fileUploader'

const uploadPath = process.env.DEFAULT_UPLOAD_PATH;

const prisma = getPrismaClient()

//get all recipes
export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany()

        return Response.json({
            recipes
        }, { status: 200 })
        
    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//create recipe
export async function POST(req: Request) {
    //extract data from formData
    const formData = await req.formData()
    console.log(formData)
    

    const name: any = formData.get('name')
    const diffculty = formData.get('difficulty')
    const time = formData.get('time')
    const ingredients = formData.get('ingredients')
    const titleSteps = formData.get('titleSteps')
    const titleImage: any = formData.get('titleImage')

    const currentDate = Date.now()
    const formattedName = name.replace(/\s+/g, '-')

    //upload title images
    try {
        const newTitleImageName = `${currentDate}-${formattedName}-${titleImage.name}`
        const titlePath = uploadPath + '/images/recipes/title/' + newTitleImageName
        const titleData = await titleImage.arrayBuffer();
        await fsPromises.writeFile(titlePath, Buffer.from(titleData))
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
    //upload step images
    try {
        
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }


    return Response.json({
        message: "ok"
    })


    /*const formattedName: string = name.replace(/\s+/g, '-')
    const titleImage = formData.get('titleImage')
    
    if (titleImage instanceof File) {
        try {
            const newFileName = `${date}-${formattedName}-${titleImage.name}`
            const imagePath = './app/uploads/images/recipes/title/' + newFileName
    
            const fileData = await titleImage.arrayBuffer();

            await fsPromises.writeFile(imagePath, Buffer.from(fileData));
    
        } catch (error) {
            console.error(error)
        }
    } else {
        console.error('No image')
    }

    
    */
    /*try {
        const {
            name,
            diffculty,
            time,
            ingredients,
            steps,
            authorId
        } = await req.json()
    
        if (
            !name ||
            !diffculty ||
            !time ||
            !ingredients ||
            !steps ||
            !authorId
        ) {
            return Response.json({
                message: "Invalid data"
            }, { status: 400 })
        }
    
        const newRecipe = await prisma.recipe.create({
            data: {
                name,
                diffculty,
                time,
                ingredients,
                steps,
                authorId
            },
        })
        
        return Response.json({
            message: "Created"
        }, { status: 201 })

    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }*/
}

//delete recipe
export async function DELETE(req: Request) {
    try {
        const {
            id,
            authorId
        } = await req.json()

        await prisma.recipe.delete({
            where: {
                id,
                authorId
            }
        })

        return Response.json({
            message: "Deleted"
        }, { status: 201 })

    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}