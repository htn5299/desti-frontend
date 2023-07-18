import { Route, Routes } from 'react-router-dom'
import {
  EditProfilePage,
  FriendsPage,
  HomePage,
  LoginPage,
  MessagePage,
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
import { ContentMessage } from './components/Message'
import ComplexNavbar from 'components/Navbar/ComplexNavbar'

function App() {
  return (
    <Routes>
      <Route path={'login'} element={<LoginPage />} />
      <Route path={'register'} element={<RegisterPage />} />
      <Route path={'/'} element={<RequireAuth children={<AppPage />} />}>
        <Route path={'/'} element={<ComplexNavbar />}>
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
          <Route path={'friend'}>
            <Route path={'user'}>
              <Route path={':userId'} element={<FriendsPage />} />
            </Route>
          </Route>
          <Route path={'location'}>
            <Route index element={<CreateLocationPage />} />
          </Route>
        </Route>

        <Route path={'message'} element={<MessagePage />}>
          <Route path={':conversationId'} element={<ContentMessage />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
