import { BackHome, Login } from '../components/Authentication'

export default function LoginPage() {
  return (
    <div className={'flex flex-col items-center justify-center'}>
      <BackHome />
      <Login />
    </div>
  )
}
