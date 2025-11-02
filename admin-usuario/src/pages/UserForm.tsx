import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../data/store'
import { createUser, updateUser, fetchUsers } from '../data/userSlice'
import type { User } from '../data/userTypes'

export default function UserForm() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { users } = useSelector((s: RootState) => s.user)
  const existing = users.find(u => u.id === Number(id))

  const [form, setForm] = useState<Partial<User>>({
    name: '', username: '', email: '', phone: '', website: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { if (!users.length) dispatch(fetchUsers()) }, [dispatch, users.length])
  useEffect(() => { if (existing) setForm(existing) }, [existing])

  const validate = (): string | null => {
    if (!form.name?.trim()) return 'Nombre obligatorio'
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Email inválido'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError(null)
    setSubmitting(true)
    try {
      if (isEdit && id) {
        await dispatch(updateUser({ id: Number(id), payload: form })).unwrap()
      } else {
        await dispatch(createUser(form as Omit<User, 'id'>)).unwrap()
      }
      navigate('/')
    } catch (err: any) {
      setError(err?.message ?? 'Error en la operación')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
        <input className="border p-2 w-full rounded" placeholder="Nombre" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className="border p-2 w-full rounded" placeholder="Usuario" value={form.username || ''} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
        <input className="border p-2 w-full rounded" placeholder="Email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="border p-2 w-full rounded" placeholder="Teléfono" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        <input className="border p-2 w-full rounded" placeholder="Sitio web" value={form.website || ''} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
        <div className="flex gap-2">
          <button disabled={submitting} type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {submitting ? 'Procesando...' : 'Guardar'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
