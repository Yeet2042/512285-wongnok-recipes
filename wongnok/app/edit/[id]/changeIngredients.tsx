import React, { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

interface Ingredient {
    name: string;
    quantity: string;
}

type Props = {
    refIngredients: Ingredient[]
    onUpdateNewIngredientList: (newIngredientList: Ingredient[]) => void
}

export default function ChangeIngredients({ refIngredients, onUpdateNewIngredientList }: Props) {
    const [newIngredients, setNewIngredients] = useState<Ingredient[]>([])    

    useEffect(() => {
        setNewIngredients(refIngredients)
    }, [refIngredients])

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        const updatedIngredients = [...newIngredients];
        updatedIngredients[index][field] = value;
        setNewIngredients(updatedIngredients);
        onUpdateNewIngredientList(updatedIngredients);
    }

    const handleChangeNewIngredientTitle = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        handleIngredientChange(index, 'name', e.target.value);
    }
    const handleChangeNewIngredientQuantity = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        handleIngredientChange(index, 'quantity', e.target.value);
    }
    const handleAddNewIngredient = () => {
        const updatedIngredients = [...newIngredients, { name: '', quantity: '' }];
        setNewIngredients(updatedIngredients);
        onUpdateNewIngredientList(updatedIngredients);
    }
    
    const handleRemoveNewIngredient = (index: number) => {
        const newInputs = [...newIngredients];
        newInputs.splice(index, 1);
        setNewIngredients(newInputs);
        onUpdateNewIngredientList(newInputs);
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {newIngredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-4">
                        <Input
                            placeholder={`ชื่อวัตถุดิบที่ ${index + 1}`}
                            value={ingredient.name}
                            onChange={(e) => handleChangeNewIngredientTitle(index, e)}
                            className="w-2/3"
                        />
                        <Input
                            placeholder={`จำนวนวัตถุดิบที่ ${index + 1}`}
                            value={ingredient.quantity}
                            onChange={(e) => handleChangeNewIngredientQuantity(index, e)}
                            className="w-1/3"
                        />
                        <Button
                            color="danger"
                            variant="flat"
                            startContent={<TrashIcon className="h-5 w-5" />}
                            onClick={() => handleRemoveNewIngredient(index)}
                            className=""
                        >
                                ลบ
                        </Button>
                    </div>
                ))}
                <Button
                    variant="flat"
                    color="success"
                    startContent={ <PlusIcon className="h-5 w-5" /> }
                    onPress={handleAddNewIngredient}
                    className="w-fit"
                >
                    เพิ่มวัตถุดิบ
                </Button>
            </div>
        </>
    )
}