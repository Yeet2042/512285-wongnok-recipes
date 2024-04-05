import { getPrismaClient } from "@/app/components/prismaClient"
import bcrypt from "bcrypt"

const prisma = getPrismaClient()

//create user
export async function POST(req: Request) {
    try {
        const {
            username,
            email,
            password
        } = await req.json()

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        if (!username || !email || !password) {
            return Response.json({
                message: "Invalid data"
            }, { status: 422 })
        }

        //check exist user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        })
        if (existingUser) {
            return Response.json({
                message: "Username or email already exists"
            }, { status: 400 })
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
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