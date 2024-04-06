import { promises as fsPromises } from 'fs'
import path from 'path'
import { getPrismaClient } from "@/app/components/prismaClient"

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
    const formData = await req.formData()
    const name: any = formData.get('name')
    const formattedName: string = name.replace(/\s+/g, '-')
    const titleImage = formData.get('titleImage')
    
    if (titleImage instanceof File) {
        try {
            const date = Date.now()
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

    
    return Response.json({
        message: "ok"
    })
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