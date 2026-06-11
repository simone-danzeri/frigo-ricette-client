import { useEffect, useState } from 'react'
import { type Ingredient } from '../types'
import { getIngredients, createIngredient, updateIngredient, deleteIngredient, addToGrocery, removeFromGrocery } from '../api/ingredients'

function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  // stato per il form di creazione
  const [newName, setNewName] = useState('')
  const [newQuantity, setNewQuantity] = useState(1)

  // stato per la modifica
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editQuantity, setEditQuantity] = useState(1)
  const [editAvailable, setEditAvailable] = useState(true)

  useEffect(() => {
    loadIngredients()
  }, [])

  function loadIngredients() {
    setLoading(true)
    getIngredients().then(data => {
      setIngredients(data)
      setLoading(false)
    })
  }

  function handleCreate() {
    if (!newName.trim()) return
    createIngredient({ name: newName, quantity: newQuantity, isAvailable: true })
      .then(() => {
        setNewName('')
        setNewQuantity(1)
        loadIngredients()
      })
  }

  function handleDelete(id: number) {
    deleteIngredient(id).then(() => loadIngredients())
  }

  function startEdit(ingredient: Ingredient) {
    setEditingId(ingredient.id)
    setEditName(ingredient.name)
    setEditQuantity(ingredient.quantity)
    setEditAvailable(ingredient.isAvailable)
  }

  function handleUpdate() {
    if (!editingId) return
    updateIngredient(editingId, { name: editName, quantity: editQuantity, isAvailable: editAvailable })
      .then(() => {
        setEditingId(null)
        loadIngredients()
      })
  }

  function handleToggleGrocery(ingredient: Ingredient) {
    const inGrocery = ingredient.quantity < 1
    if (inGrocery) {
      removeFromGrocery(ingredient.id).then(() => loadIngredients())
    } else {
      addToGrocery(ingredient.id).then(() => loadIngredients())
    }
  }

  if (loading) return <p>Caricamento...</p>

  return (
    <div>
      <h1>Ingredienti</h1>

      {/* Form creazione */}
      <div>
        <input
          type="text"
          placeholder="Nome ingrediente"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantità"
          value={newQuantity}
          onChange={e => setNewQuantity(Number(e.target.value))}
        />
        <button onClick={handleCreate}>Aggiungi</button>
      </div>

      {/* Lista ingredienti */}
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>
            {editingId === ingredient.id ? (
              // Form modifica inline
              <div>
                <input value={editName} onChange={e => setEditName(e.target.value)} />
                <input type="number" value={editQuantity} onChange={e => setEditQuantity(Number(e.target.value))} />
                <label>
                  <input type="checkbox" checked={editAvailable} onChange={e => setEditAvailable(e.target.checked)} />
                  Disponibile
                </label>
                <button onClick={handleUpdate}>Salva</button>
                <button onClick={() => setEditingId(null)}>Annulla</button>
              </div>
            ) : (
              // Visualizzazione normale
              <div>
                <span>{ingredient.name} — quantità: {ingredient.quantity}</span>
                <button onClick={() => startEdit(ingredient)}>Modifica</button>
                <button onClick={() => handleDelete(ingredient.id)}>Elimina</button>
                <button onClick={() => handleToggleGrocery(ingredient)}>
                  {ingredient.quantity < 1 ? 'Rimuovi da spesa' : 'Aggiungi a spesa'}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IngredientsPage