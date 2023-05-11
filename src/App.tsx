import { Route, Routes } from 'react-router-dom'
import RequireAuth from 'components/RequireAuth'
import { HomePage, LoginPage, NotFoundPage, PlacePage, ProfilePage, RegisterPage } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<RequireAuth />}>
        <Route index element={<HomePage />} />
        <Route path='/places'>
          <Route path=':placeId' element={<PlacePage />}></Route>
        </Route>
        <Route path='users'>
          <Route path='me' element={<ProfilePage />}></Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default App
