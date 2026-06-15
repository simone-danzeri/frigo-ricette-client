import { useEffect, useState } from "react";
import { type Ingredient, type Recipe } from "../types";
import { cookRecipe, createRecipe, deleteRecipe, getRecipes } from "../api/recipes";
import { getIngredients } from "../api/ingredients";

function RecipesPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    // stato per form di creazione ricetta
    const [newName, setNewName] = useState("");
    const [newProcess, setNewProcess] = useState("");
    const [selectedIngredientsIds, setSelectedIngredientsIds] = useState<number[]>([]);

    useEffect(() => {
        Promise.all([getRecipes(), getIngredients()]).then(([recipesData, ingredientsData]) => {
            setRecipes(recipesData);
            setIngredients(ingredientsData);
            setLoading(false)
        })
    }, []);

    function loadRecipes() {
        getRecipes().then(data => {
            setRecipes(data);
        })
    }

    function handleCreate() {
        if(!newName.trim() || !newProcess.trim()) return
        createRecipe({ name: newName, process: newProcess, ingredientsIds: selectedIngredientsIds})
        .then(() => {
            setNewName("");
            setNewProcess("");
            setIngredients([]);
            loadRecipes()
        });
    }

    function handleDelete(id: number) {
        deleteRecipe(id).then(() => loadRecipes())
    }

    function handleCook(id: number) {
        cookRecipe(id).then(() => alert('Ingredienti mancanti aggiunti alla lista della spesa!'));
    }

    function toggleIngredient(id: number) {
        setSelectedIngredientsIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    if(loading) return <p>Caricamento...</p>

    return (
    <div>
      <h1>Ricette</h1>

      {/* Form creazione */}
      <div>
        <input
          type="text"
          placeholder="Nome ricetta"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <textarea
          placeholder="Procedimento"
          value={newProcess}
          onChange={e => setNewProcess(e.target.value)}
        />
        <div>
          <p>Ingredienti:</p>
          {ingredients.map(ingredient => (
            <label key={ingredient.id}>
              <input
                type="checkbox"
                checked={selectedIngredientsIds.includes(ingredient.id)}
                onChange={() => toggleIngredient(ingredient.id)}
              />
              {ingredient.name}
            </label>
          ))}
        </div>
        <button onClick={handleCreate}>Crea ricetta</button>
      </div>

      {/* Lista ricette */}
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <div>
              <strong>{recipe.name}</strong>
              <p>{recipe.process}</p>
              <p>Ingredienti: {recipe.ingredients.map(i => i.name).join(', ')}</p>
              <button onClick={() => handleCook(recipe.id)}>🍳 Cucina questa ricetta</button>
              <button onClick={() => handleDelete(recipe.id)}>Elimina</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default RecipesPage;