import { getPrismaClient } from "@/app/components/prismaClient"

const prisma = getPrismaClient()

//get recommend
export async function GET() {
    try {
        //top Rating
        const topRating = await prisma.recipe.findMany({
            include: {
                author: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                },
                comments: true
            }
        })

         //คำนวณคะแนนเฉลี่ยของเรื่องราวแต่ละเรื่อง
        const recipesWithAvgRating = topRating.map(recipe => {
            // ตรวจสอบว่า comments ไม่ใช่ null และมีความยาวมากกว่า 0
            if (recipe.comments && recipe.comments.length > 0) {
                const ratings = recipe.comments.map(comment => comment.rating);
                const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
                return { ...recipe, averageRating };
            } else {
                // ถ้า comments เป็น null หรือไม่มีความยาว
                // คุณสามารถกำหนดค่าเริ่มต้นหรือทำอย่างอื่นแทนได้ตามต้องการ
                return { ...recipe, averageRating: 0 }; // เช่น กำหนดค่าเฉลี่ยเป็น 0
            }
        });

        const sortedRecipes = recipesWithAvgRating.sort((a, b) => b.averageRating - a.averageRating)

        //top view
        const topView = await prisma.recipe.findMany({
            orderBy: {
                viewers: 'desc'
            },
            take: 1,
            include: {
                author: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                },
                comments:{
                    select: {
                        rating: true
                    }
                }
            }
        })

        //most less ingredient
        const lessIngredient = await prisma.recipe.findFirst({
            orderBy: {
                ingredients: {
                    _count: 'asc'
                }
            },
            include: {
                author: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                },
                comments:{
                    select: {
                        rating: true
                    }
                }
            }
        })

        //most less step
        const lessStep = await prisma.recipe.findFirst({
            orderBy: {
                steps: 'asc'
            },
            include: {
                author: {
                    select: {
                        username: true,
                        role: true,
                        image: true
                    }
                },
                comments:{
                    select: {
                        rating: true
                    }
                }
            }
        })

        return Response.json({
            "คะแนนเฉลี่ยมากที่สุด": sortedRecipes[0],
            "มีคนดูมากที่สุด": topView[0],
            "ใช้วัตถุดิบน้อยที่สุด": lessIngredient,
            "ใช้ขั้นตอนน้อยที่สุด": lessStep
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}