import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//create recipe
export async function POST(req: Request) {
    try {
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
        
        if (newRecipe) {
            return Response.json({
                message: "Created"
            }, { status: 201 })
        } else {
            return Response.json({
                message: "Can not Create"
            }, { status: 500 })
        }
    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}