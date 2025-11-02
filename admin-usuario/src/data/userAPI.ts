import { api } from './axios'
import type { User } from './userTypes'

export const fetchUsersApi = async (): Promise<User[]> => (await api.get('/users')).data
export const fetchUserByIdApi = async (id: number): Promise<User> => (await api.get(`/users/${id}`)).data
export const createUserApi = async (payload: Omit<User, 'id'>): Promise<User> => (await api.post('/users', payload)).data
export const updateUserApi = async (id: number, payload: Partial<User>): Promise<User> => (await api.put(`/users/${id}`, payload)).data
export const deleteUserApi = async (id: number): Promise<void> => { await api.delete(`/users/${id}`) }
