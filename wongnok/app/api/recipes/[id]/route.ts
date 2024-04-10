import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//get recipe by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: params.id,
            },
            include: {
                author: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                }
            }
        })

        if (recipe) {
            const addView = await prisma.recipe.update({
                where: {
                    id: params.id,
                },
                data: {
                    viewers: { increment: 1 }
                }
            })

            return Response.json({
                recipe
            }, { status: 200 })
        }

        return Response.json({
            message: "Not found"
        }, { status: 404 })
        
    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}