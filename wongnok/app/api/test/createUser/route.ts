import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//create user
export async function POST(req: Request) {
    try {
        const {
            name,
            email,
            password
        } = await req.json()
    
        if (!name || !email || !password) {
            return Response.json({
                message: "Invalid data"
            }, { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            },
        })
        
        if (newUser) {
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