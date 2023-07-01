import { Card, Button, Typography } from '@material-tailwind/react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useLoginMutation } from '../../redux/api/authApi'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from 'redux/store'
import { selectCurrentToken, setCredentials } from 'redux/features/authSlice'
import { isErrorWithMessage } from 'utils/helpers'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

export default function Login() {
  let location = useLocation()
  let from = location.state?.from?.pathname || '/'
  const token = useSelector(selectCurrentToken)
  const [email, setEmail] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState(0)
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true })
    }
  }, [token, navigate, from])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !password) {
      return
    }
    try {
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({ email, accessToken: userData?.accessToken, refreshToken: userData?.refreshToken }))
      navigate(from, { replace: true })
      setEmail('')
      setPassword('')
    } catch (error) {
      if (isErrorWithMessage(error)) {
        if (error.status === 404) {
          setErrMsg(1)
          emailRef.current?.focus()
        } else if (error.status === 401) {
          setErrMsg(2)
          passwordRef.current?.focus()
        }
      }
    }
  }
  useEffect(() => {
    setErrMsg((prev) => (prev === 1 ? 0 : prev))
  }, [email])
  useEffect(() => {
    setErrMsg((prev) => (prev === 2 ? 0 : prev))
  }, [password])

  return (
    <Card color='transparent' shadow={false} className='border border-gray-300 bg-white p-5'>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Welcome back.
      </Typography>

      <form className='mb-2 mt-8 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-bold', {
                'text-red-700 dark:text-red-500': errMsg === 1
              })}
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='text'
              id='email'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm', {
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                  errMsg === 1
              })}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(() => event.target.value)}
              ref={emailRef}
              required
            />
            <p
              className={classNames('', {
                hidden: errMsg !== 1,
                'mt-2 text-sm text-red-600 dark:text-red-500': errMsg === 1
              })}
            >
              <span className='font-medium'>Email not found!</span>
            </p>
          </div>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-bold', {
                'text-red-700 dark:text-red-500': errMsg === 2
              })}
              htmlFor='password'
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type='password'
              id='password'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm', {
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                  errMsg === 2
              })}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(() => event.target.value)}
              required
            />
            <p
              className={classNames('', {
                hidden: errMsg !== 2,
                'mt-2 text-sm text-red-600 dark:text-red-500': errMsg === 2
              })}
            >
              <span className='font-medium'>Password are not correct!</span>
            </p>
          </div>
        </div>

        <Button className='mt-6' fullWidth type='submit'>
          Login
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          {`Don't have an account? `}
          <Link to='/register' className='font-medium text-blue-500 transition-colors hover:text-blue-700'>
            Register
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
