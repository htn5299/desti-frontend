import { Route, Routes } from 'react-router-dom'
import {
  EditProfilePage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PlacePage,
  ProfilePage,
  RegisterPage,
  SearchPage
} from './pages'
import { RequireAuth } from './components/Authentication'
import AppPage from './pages/AppPage'
import { HereMap, WantMap } from './components/Favourite'
import CreateLocationPage from './pages/CreateLocationPage'
import { PostListUser } from './components/Post'

function App() {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='/' element={<RequireAuth children={<AppPage />} />}>
        <Route index element={<HomePage />} />
        <Route path='places'>
          <Route path=':placeId' element={<PlacePage />} />
        </Route>
        <Route path='users'>
          <Route path={':userId'} element={<ProfilePage />}>
            <Route index element={<PostListUser />} />
            <Route path={'here'} element={<HereMap />} />
            <Route path={'want'} element={<WantMap />} />
          </Route>
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
