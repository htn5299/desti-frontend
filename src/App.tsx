import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Home from './pages/Home'
import { ComplexNavbar } from './components'
import { Route, Routes } from 'react-router-dom'
import RequireAuth from 'redux/features/RequireAuth'

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Route>
      <Route path='/home' element={<RequireAuth />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
