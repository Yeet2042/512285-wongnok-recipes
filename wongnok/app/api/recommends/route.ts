import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        //most Rating

        //most view
        const mostView = await prisma.recipe.findMany({
            orderBy: {
                viewers: 'desc'
            },
            take: 1
        })
        //most Comment

        //most less time
        const lessTime = await prisma.recipe.findMany({
            orderBy: {
              time: 'asc',
            },
            take: 1,
          })

        return Response.json({
            mostView,
            lessTime
        }, { status: 200 })

        //most less ingredient

        //most less step

    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}