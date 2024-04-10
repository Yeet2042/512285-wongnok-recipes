import { promises as fsPromises } from 'fs'
import { getPrismaClient } from "@/app/components/prismaClient"

const uploadPath = process.env.DEFAULT_UPLOAD_PATH;

const prisma = getPrismaClient()

//get all recipes
export async function GET() {
    try {
        const recipes = await prisma.recipe.findMany({
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
            recipes
        }, { status: 200 })
        
    } catch (error) {
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//create recipe
export async function POST(req: Request) {
    //extract data from formData
    const formData = await req.formData()
    
    const name: any = formData.get('name')
    const diffculty: any = formData.get('difficulty')
    const time: any = formData.get('time')
    const ingredients: any = formData.get('ingredients')
    const titleSteps: any = formData.get('titleSteps')
    const titleImage: any = formData.get('titleImage')
    const userId:any = formData.get('userId')

    const ingredientsArray = JSON.parse(ingredients)
    const titleStepsArray = JSON.parse(titleSteps)

    const currentDate = Date.now()
    const formattedName = name.replace(/\s+/g, '-')

    //loop stepImage
    const stepImages: File[] = []

    for (const [name, value] of formData.entries()) {
        if (name.startsWith('step') && typeof value === 'object' && value instanceof File) {
            stepImages.push(value);
        }
    }

    //upload title images
    let titleImageURL: string

    try {
        const newTitleImageName = `${Date.now()}-${formattedName}-${titleImage.name}`
        const titlePath = uploadPath + '/recipes/title/' + newTitleImageName
        const titleData = await titleImage.arrayBuffer()
        await fsPromises.writeFile(titlePath, Buffer.from(titleData))
        titleImageURL = '/recipes/title/' + newTitleImageName
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }

    //upload step images
    const stepImageURL: string[] = []

    try {
        for (let index = 0; index < stepImages.length; index++) {
            const stepImage = stepImages[index]
            const newStepImageName = `${Date.now()}-${formattedName}-${stepImage.name}`
            const stepPath = uploadPath + '/recipes/steps/' + newStepImageName
            const stepData = await stepImage.arrayBuffer()
            await fsPromises.writeFile(stepPath, Buffer.from(stepData))
            stepImageURL.push('/recipes/steps/' + newStepImageName)
        }
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }

    //DB push
    try {
        const newRecipe = await prisma.recipe.create({
            data: {
                titleImage: titleImageURL,
                stepImages: stepImageURL,
                name,
                diffculty,
                time,
                ingredients: ingredientsArray,
                steps: titleStepsArray,
                authorId: userId
            },
        })
        return Response.json({
            message: "สร้างสูตรเรียบร้อย"
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//update recipe
export async function PUT(req: Request) {
    try {
        const formData = await req.formData()
        console.log(formData)
        

        const recipeId = formData.get('recipeId')
        const authorId = formData.get('authorId')
        const newRecipeName = formData.get('newRecipeName')
        const newDiff = formData.get('newDiff')
        const newTime = formData.get('newTime')
        const newIngredients = formData.get('newIngredients')
        const newTitleSteps = formData.get('newTitleSteps')
        const newTitleImage = formData.get('newTitleImage')

        //authenticated
        const recipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId
            }
        })
        if (recipe?.authorId !== authorId) {
            return Response.json({
                message: "Unauthorized"
            }, { status: 401 })
        }

        if (newRecipeName !== "null") {
            const updateRecipeName = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    name: newRecipeName
                }
            })
        }

        if (newDiff !== "null") {
            const updateDiff = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    diffculty: newDiff
                }
            })
        }
        if (newTime !== "null") {
            const updateTime = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    time: newTime
                }
            })
        }
        if (newIngredients !== "null") {
            const updateIngredients = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    ingredients: newIngredients
                }
            })
        }
        if (newTitleSteps.lenght > 0) {
            const updateTitleSteps = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    steps: newTitleSteps
                }
            })
        }
        if (newTitleImage !== "null") {
            //upload image
            let newTitleImageURL: string
            const formattedName = recipe.name.replace(/\s+/g, '-')
            try {
                const newTitleImageName = `${Date.now()}-${formattedName}-${newTitleImage.name}`
                const titlePath = uploadPath + '/recipes/title/' + newTitleImageName
                const titleData = await newTitleImage.arrayBuffer()
                await fsPromises.writeFile(titlePath, Buffer.from(titleData))
                newTitleImageURL = '/recipes/title/' + newTitleImageName
            } catch (error) {
                console.log(error)
                return Response.json({
                    message: "Internal server error"
                }, { status: 500 })
            }

            const updateTitleImage = await prisma.recipe.update({
                where: {
                    id: recipeId
                },
                data: {
                    titleImage: newTitleImageURL
                }
            })
        }

        return Response.json({
            message: "Updated"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}

//delete recipe
export async function DELETE(req: Request) {
    try {
        const {
            id,
            authorId
        } = await req.json()

        // ลบ comment ก่อนลบ recipe
        await prisma.comment.deleteMany({
            where: {
                recipeId: id
            }
        })

        // ลบ recipe
        await prisma.recipe.delete({
            where: {
                id,
                authorId
            }
        })

        return Response.json({
            message: "Deleted"
        }, { status: 201 })

    } catch (error) {
        console.log(error)
        
        return Response.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}