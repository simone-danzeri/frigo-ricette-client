import { Routes, Route, Link } from "react-router-dom"
import IngredientsPage from "./pages/IngredientsPage"
import RecipesPage from "./pages/RecipesPage"
import GroceriesPage from "./pages/GroceriesPage"
function App() {
  return (
    <div>
      <h1>Frigo Ricette</h1>
      <nav>
        <div>
          <Link to="/">Ingredienti</Link>
        </div>
        <Link to="/recipes">Ricette</Link>
        <Link to="/groceries">Lista della spesa</Link>
      </nav>
      <Routes>
        <Route path="/" element={<IngredientsPage />}/>
        <Route path="/recipes" element={<RecipesPage />}/>
        <Route path="/groceries" element={<GroceriesPage />}/>
      </Routes>
    </div>
  )
}

export default App