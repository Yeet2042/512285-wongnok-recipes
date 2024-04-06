"use client"
import React, { useEffect, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'

type Props = {
    ingredients: (ingredients: { name: string; quantity: string }[]) => void
}

export default function AddIngredients({ ingredients }: Props) {
    const [ingredientInputs, setIngredientInputs] = useState<{ name: string; quantity: string }[]>([])

    useEffect(() => {
        ingredients(ingredientInputs);
    }, [ingredientInputs, ingredients])
    
    const handleAddIngredient = () => {
        setIngredientInputs([...ingredientInputs, { name: '', quantity: '' }]);
    };
    
    const handleRemoveIngredient = (index: number) => {
        const newInputs = [...ingredientInputs];
        newInputs.splice(index, 1);
        setIngredientInputs(newInputs);
    };

    const handleChangeIngredient = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = [...ingredientInputs];
        newInputs[index].name = e.target.value;
        setIngredientInputs(newInputs);
    }

    const handleChangeQuantity = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = [...ingredientInputs];
        newInputs[index].quantity = e.target.value;
        setIngredientInputs(newInputs);
    }
    return (
        <>
            <h2 className="text-xl font-bold">วัตถุดิบ</h2>
            {ingredientInputs.map((input, index) => (
                <div key={index} className="flex gap-4">
                    <Input
                    placeholder={`ชื่อวัตถุดิบที่ ${index + 1}`}
                    value={input.name}
                    onChange={(e) => handleChangeIngredient(index, e)}
                    className="w-2/3"
                    />
                    <Input
                    placeholder={`จำนวนวัตถุดิบที่ ${index + 1}`}
                    value={input.quantity}
                    onChange={(e) => handleChangeQuantity(index, e)}
                    className="w-1/3"
                    />
                    <Button
                    color="danger"
                    variant="flat"
                    startContent={<TrashIcon className="h-5 w-5" />}
                    onClick={() => handleRemoveIngredient(index)}
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
                onPress={handleAddIngredient}
                className="w-fit"
            >
                เพิ่มวัตถุดิบ
            </Button>
        </>
    )
}