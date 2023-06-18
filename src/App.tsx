import { Route, Routes } from 'react-router-dom'
import RequireAuth from 'components/Authentication/RequireAuth'
import { HomePage, LoginPage, NotFoundPage, PlacePage, ProfilePage, RegisterPage, SearchPage } from './pages'
import EditProfilePage from './pages/EditProfilePage'
import CreateLocationPage from './pages/CreateLocationPage'
function App() {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='/' element={<RequireAuth />}>
        <Route index element={<HomePage />} />
        <Route path='places'>
          <Route path=':placeId' element={<PlacePage />} />
        </Route>
        <Route path='users'>
          <Route path={':userId'} element={<ProfilePage />} />
          <Route path='edit' element={<EditProfilePage />} />
        </Route>
        <Route path={'search'}>
          <Route index element={<SearchPage />} />
        </Route>
        <Route path={'location'}>
          <Route index element={<CreateLocationPage />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
