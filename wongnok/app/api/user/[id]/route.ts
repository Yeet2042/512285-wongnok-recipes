import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        const userRecipes = await prisma.recipe.findMany({
            where: {
                authorId: id
            },
            include: {
                comments: {
                    select: {
                        rating: true
                    }
                }
            }
        })
        return Response.json({
            userRecipes
        }, { status: 200 })
        
    } catch (error) {
        console.error(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}