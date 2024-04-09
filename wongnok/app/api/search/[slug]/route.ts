import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug
        const stringSlug = slug.toString()
        
        const searchList = await prisma.recipe.aggregateRaw({
            pipeline: [
                {
                    $search: {
                        index: "recipeSearch",
                        compound: {
                                must: [
                                {
                                    autocomplete: {
                                        query: `${stringSlug}`,
                                        path: "name",
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "User",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author",
                    },
                },
                {
                    $lookup: {
                        from: "Comment",
                        localField: "_id",
                        foreignField: "recipeId",
                        as: "comments",
                    },
                },
                {
                    $project: {
                        titleImage: 1,
                        name: 1,
                        diffculty: 1,
                        time: 1,
                        createdAt: 1,
                        viewers: 1,
                        "author.username": 1,
                        "author.role": 1,
                        "author.image": 1,
                        "comments.rating": 1,
                    },
                },
            ]
        })
        return Response.json({
            searchList
        }, { status: 200 })

    } catch (error) {
        console.error(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}