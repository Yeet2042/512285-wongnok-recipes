import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//ดึงข้อมูลสูตรทั้งหมดใน DB
export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany()

        if (recipes) {
            return Response.json({
                recipes
            }, { status: 200 })
        } else {
            return Response.json({
                message: "Can not get"
            }, { status: 500 })
        }
    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}