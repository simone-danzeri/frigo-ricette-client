import { useEffect, useState } from "react";
import { type Recipe } from "../types";
import { getRecipes } from "../api/recipes";

function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRecipes().then(data => {
            setRecipes(data)
            setLoading(false)
        })
    }, [])

    if(loading) return <p>Caricamento...</p>

    return(
        <div>
            <h1>Ricette</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipesPage;