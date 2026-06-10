import { useEffect, useState } from 'react'
import { type Grocery } from '../types'
import { getGroceries } from '../api/groceries'

function GroceriesPage() {
  const [groceries, setGroceries] = useState<Grocery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGroceries()
      .then(data => {
        setGroceries(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Caricamento...</p>

  return (
    <div>
      <h1>Lista della spesa</h1>
      <ul>
        {groceries.map(grocery => (
          <li key={grocery.id}>
            {grocery.ingredient.name} — quantità: {grocery.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GroceriesPage