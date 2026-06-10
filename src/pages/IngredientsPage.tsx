import { useEffect, useState } from "react";
import { type Ingredient } from "../types";
import { getIngredients } from "../api/ingredients";

function IngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getIngredients().then(data => {
            setIngredients(data)
            setLoading(false)
        })
    }, []);

    if(loading) return <p>Caricamento...</p>

    return (
        <div>
            <h1>Ingredienti</h1>
            <ul>
                {ingredients.map(ingredient => (
                    <li key = {ingredient.id}>
                        {ingredient.name} - quantità: {ingredient.quantity}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default IngredientsPage