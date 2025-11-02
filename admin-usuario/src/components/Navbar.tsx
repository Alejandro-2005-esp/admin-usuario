import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Users CRUD</h1>
        <div className="space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Lista</Link>
          <Link to="/create" className="text-blue-600 hover:underline">Crear</Link>
        </div>
      </div>
    </nav>
  )
}
