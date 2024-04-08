import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//get comments by recipe id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                recipeId: params.id,
            },
            select: {
                id: true,
                comment: true,
                rating: true,
                createdAt: true,
                user: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                }
            },
        })

        if (comments) {
            return Response.json({
                comments
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

//create comment
export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id
        const { comment, rating, userId } = await req.json()

        //check data
        if (!comment || !rating || !userId) {
            return Response.json({
                message: "Missing data"
            }, { status: 400 })
        }

        //check rating
        if (rating < 1 || rating > 5) {
            return Response.json({
                message: "Rating must be between 1 and 5"
            }, { status: 400 })
        }

        //check exist comment
        const existingComment = await prisma.comment.findFirst({
            where: {
                recipeId: id,
                userId
            }
        })

        if (existingComment) {
            return Response.json({
                message: "You have already commented on this recipe"
            }, { status: 400 })
        }

        const newComment = await prisma.comment.create({
            data: {
                comment,
                rating,
                recipeId: id,
                userId
            }
        })

        return Response.json({
            message: "Comment created"
        }, { status: 201 })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//delete comment
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const commentId = params.id
        const { userId } = await req.json()

        //authenticated
        const comment = await prisma.comment.findUnique({
            where: {
                id: commentId
            },
            select: {
                userId: true
            }
        });

        if (!comment) {
            return Response.json({
                message: "Comment not found"
            }, { status: 404 })
        }

        if (comment.userId !== userId) {
            return Response.json({
                message: "Unauthorized"
            }, { status: 401 })
        }

        //delete comment
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        })

        return Response.json({
            message: "Comment deleted"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}