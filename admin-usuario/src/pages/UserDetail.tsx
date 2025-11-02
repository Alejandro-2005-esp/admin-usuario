import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { fetchUserById } from '../data/userSlice'
import Loader from '../components/Loader'

export default function UserDetail() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading } = useSelector((s: RootState) => s.user)
  const user = users.find(u => u.id === Number(id))

  useEffect(() => {
    if (id) dispatch(fetchUserById(Number(id)))
  }, [dispatch, id])

  if (loading && !user) return <Loader />
  if (!user) return <div className="p-4">Usuario no encontrado</div>

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <div className="mt-4">
        <Link to="/" className="text-blue-600">Volver</Link>
        <Link to={`/edit/${user.id}`} className="ml-4 text-blue-600">Editar</Link>
      </div>
    </div>
  )
}
