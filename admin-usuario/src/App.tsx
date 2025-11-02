
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserList from './pages/UserList'
import UserForm from './pages/UserForm'
import UserDetail from './pages/UserDetail'

export default function App() {
  return (
    <>
    <h1>Hola</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />

        <Route path="/create" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </>
  )
}
