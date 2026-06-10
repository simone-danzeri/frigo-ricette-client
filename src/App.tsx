import { Routes, Route, Link } from "react-router-dom"
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
        <Route path="/" element={<div>Pagina Ingredienti</div>}/>
        <Route path="/recipes" element={<div>Pagina Ricette</div>}/>
        <Route path="/groceries" element={<div>Lista della spesa</div>}/>
      </Routes>
    </div>
  )
}

export default App