import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//get recipe by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: params.id,
              },
        })

        return Response.json({
            recipe
        }, { status: 200 })
        
    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//update recipe
export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

        const existingRecipe = await prisma.recipe.findUnique({
            where: {
                id: params.id
            }
        })

        if (!existingRecipe) {
            return Response.json({
                message: "Recipe not found"
            }, { status: 404 })
        }

        await prisma.recipe.update({
            where: {
                id: params.id
            },
            data: {
                name,
                diffculty,
                time,
                ingredients,
                steps,
                authorId
            }
        })

        return Response.json({
            message: "Updated"
        }, { status: 200 })

    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}