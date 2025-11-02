import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import * as api from './userAPI'
import type { User } from './userTypes'

type UserState = {
  users: User[],
  loading: boolean,
  error: string | null
}

const initialState: UserState = { users: [], loading: false, error: null }

// === Thunks ===
export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await api.fetchUsersApi()
    console.log('Respuesta API JSONPlaceholder:', data) // 👀 Debug opcional
    return data
  } catch (err: any) {
    return rejectWithValue(err.message ?? 'Error fetching users')
  }
})

export const fetchUserById = createAsyncThunk('user/fetchById', async (id: number, { rejectWithValue }) => {
  try { return await api.fetchUserByIdApi(id) }
  catch (err: any) { return rejectWithValue(err.message ?? 'Error fetching user') }
})

export const createUser = createAsyncThunk('user/create', async (payload: Omit<User, 'id'>, { rejectWithValue }) => {
  try { return await api.createUserApi(payload) }
  catch (err: any) { return rejectWithValue(err.message ?? 'Error creating user') }
})

export const updateUser = createAsyncThunk('user/update', async ({ id, payload }: { id: number; payload: Partial<User> }, { rejectWithValue }) => {
  try { return await api.updateUserApi(id, payload) }
  catch (err: any) { return rejectWithValue(err.message ?? 'Error updating user') }
})

export const deleteUser = createAsyncThunk('user/delete', async (id: number, { rejectWithValue }) => {
  try { await api.deleteUserApi(id); return id }
  catch (err: any) { return rejectWithValue(err.message ?? 'Error deleting user') }
})

// === Slice ===
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchUsers.pending, (s) => { 
        s.loading = true; 
        s.error = null 
      })
      .addCase(fetchUsers.fulfilled, (s, a: PayloadAction<User[]>) => { 
        s.loading = false
        s.users = Array.isArray(a.payload) ? a.payload : [] // ✅ Protege contra errores
      })
      .addCase(fetchUsers.rejected, (s, a) => { 
        s.loading = false
        s.error = (a.payload as string) ?? a.error.message ?? 'Error' 
      })

      // Fetch by id
      .addCase(fetchUserById.fulfilled, (s, a: PayloadAction<User>) => {
        const idx = s.users.findIndex(u => u.id === a.payload.id)
        if (idx >= 0) s.users[idx] = a.payload
        else s.users.push(a.payload)
      })

      // Create
      .addCase(createUser.fulfilled, (s, a: PayloadAction<User>) => { 
        s.users.push(a.payload) 
      })

      // Update
      .addCase(updateUser.fulfilled, (s, a: PayloadAction<User>) => {
        const idx = s.users.findIndex(u => u.id === a.payload.id)
        if (idx >= 0) s.users[idx] = a.payload
      })

      // Delete
      .addCase(deleteUser.fulfilled, (s, a: PayloadAction<number>) => {
        s.users = s.users.filter(u => u.id !== a.payload)
      })
  }
})

export default slice.reducer
