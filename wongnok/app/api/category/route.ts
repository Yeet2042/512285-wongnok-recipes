import { promises as fsPromises } from 'fs'
import { getPrismaClient } from "@/app/components/prismaClient"

const uploadPath = process.env.DEFAULT_UPLOAD_PATH;

const prisma = getPrismaClient()

export async function GET() {
    try {
        const categorys = await prisma.category.findMany()
        return Response.json({
            categorys
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const formData = await req.formData()

    const image: any = formData.get('image')
    const title: any = formData.get('title')
    const href: any = formData.get('href')

    if (!image || !title) {
        return Response.json({
            message: "Invalid data"
        }, { status: 422 })
    }
    try {
        //upload category image
        let categoryImageURL: string

        try {
            const newCategoryImageName = `${title}-${image.name}`
            const categoryPath = uploadPath + '/categorys/' + newCategoryImageName
            const categoryData = await image.arrayBuffer()
            await fsPromises.writeFile(categoryPath, Buffer.from(categoryData))
            categoryImageURL = '/categorys/' + newCategoryImageName
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Internal server error"
            }, { status: 500 })
        }

        //DB Push
        try {
            const newCategory = await prisma.category.create({
                data: {
                    image: categoryImageURL,
                    title,
                    href
                }
            })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Internal server error"
            }, { status: 500 })
        }

        return Response.json({
            message: "Created!"
        }, { status: 201 })
    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}
