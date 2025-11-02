import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../data/store'
import { fetchUsers, deleteUser } from '../data/userSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading, error } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!users.length) dispatch(fetchUsers())
  }, [dispatch, users.length])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Usuarios</h2>
        <Link to="/create" className="bg-blue-600 text-white px-3 py-1 rounded">Crear</Link>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ul className="bg-white rounded shadow divide-y">
        {users.map(u => (
          <li key={u.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{u.name} <span className="text-sm text-gray-500">({u.username})</span></div>
              <div className="text-sm text-gray-600">{u.email} • {u.phone}</div>
            </div>
            <div className="space-x-3">
              <Link to={`/edit/${u.id}`} className="text-blue-600">Editar</Link>
              <Link to={`/users/${u.id}`} className="text-gray-600">Ver</Link>
              <button
                onClick={() => { if (confirm(`Eliminar ${u.name}?`)) dispatch(deleteUser(u.id)) }}
                className="text-red-600"
              >Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
