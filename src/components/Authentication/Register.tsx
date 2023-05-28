import { Card, Button, Typography } from '@material-tailwind/react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation, useRegisterMutation } from '../../redux/api/authApi'
import { useAppDispatch } from '../../redux/store'
import { setCredentials } from '../../redux/features/authSlice'
import { isErrorWithMessage } from '../../utils/helpers'
export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isMatch, setIsMatch] = useState(true)
  const [register] = useRegisterMutation()
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()

  let location = useLocation()
  let from = location.state?.from?.pathname || '/'

  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await register({ email, name: username, password }).unwrap()
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({ email, accessToken: userData?.accessToken, refreshToken: userData?.refreshToken }))
      navigate(from, { replace: true })
      setEmail('')
      setPassword('')
      setUsername('')
      setErrorEmail('')
      setErrorPassword('')
      setIsMatch(true)
    } catch (error) {
      console.log(error)
      if (isErrorWithMessage(error)) {
        if (error.status === 409) {
          setErrorEmail(error.data.message as string)
        } else if (error.status === 400) {
          const errorArray = error.data.message as string[]
          errorArray.forEach((str) => {
            if (str.includes('email')) {
              setErrorEmail(str)
            } else if (str.includes('password')) {
              setErrorPassword(str)
            }
          })
        }
      }
    }
  }

  useEffect(() => {
    setErrorEmail('')
  }, [email])

  useEffect(() => {
    setErrorPassword('')
  }, [password])

  useEffect(() => {
    if (confirmPassword && confirmPassword) {
      setIsMatch(password === confirmPassword)
    } else {
      setIsMatch(true)
    }
  }, [password, confirmPassword])
  return (
    <Card color='transparent' shadow={false} className='border border-gray-300 bg-white p-5'>
      <Typography variant='h4' color='blue-gray'>
        Register
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Welcome!
      </Typography>

      <form
        id='register-form'
        className='mb-2 mt-8 w-80 max-w-screen-lg sm:w-96'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <div className='flex flex-col gap-3'>
          <div>
            <label className='mb-2 block text-sm font-semibold'>What should we call you?</label>
            <input
              type='text'
              id='name'
              className='block w-full rounded-lg border  p-2.5 text-sm'
              autoComplete='name'
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(() => event.target.value)}
              required
            />
          </div>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-semibold', {
                'text-red-700 dark:text-red-500': Boolean(errorEmail)
              })}
              htmlFor='email'
            >
              What's your email?
            </label>
            <input
              type='text'
              id='email'
              name='email'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm', {
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                  Boolean(errorEmail)
              })}
              autoComplete='new-email'
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(() => event.target.value)
              }}
              required
            />
            <p
              className={classNames('', {
                hidden: !Boolean(errorEmail),
                'mt-2 text-sm text-red-600 dark:text-red-500': Boolean(errorEmail)
              })}
            >
              <span className='font-medium'>{errorEmail}</span>
            </p>
          </div>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-semibold', {
                'text-red-700 dark:text-red-500': Boolean(errorPassword)
              })}
              htmlFor='password'
            >
              Create a password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm', {
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                  Boolean(errorPassword)
              })}
              autoComplete='new-password'
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(() => event.target.value)
              }}
              required
            />
            <p
              className={classNames('mt-2 text-sm', {
                hidden: !Boolean(errorPassword),
                ' text-red-600 dark:text-red-500': Boolean(errorPassword)
              })}
            >
              <span className='font-medium '>{errorPassword} || 'Min 6 characters, numbers & letters'</span>
            </p>
          </div>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-semibold', {
                'text-red-700 dark:text-red-500': confirmPassword && !isMatch
              })}
              htmlFor='comfirmPassword'
            >
              Re-Password
            </label>
            <input
              type='password'
              id='comfirmPassword'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm', {
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500':
                  confirmPassword && !isMatch
              })}
              autoComplete='new-confirm-password'
              value={confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(() => event.target.value)}
              required
            />
            <p
              className={classNames('', {
                hidden: isMatch,
                'mt-2 text-sm text-red-600 dark:text-red-500': !isMatch
              })}
            >
              <span className='font-medium'>Password not match!</span>
            </p>
          </div>
        </div>

        <Button className='mt-6' fullWidth type='submit'>
          Register
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          {`Have an account? `}
          <Link to='/login' className='font-medium text-blue-500 transition-colors hover:text-blue-700'>
            Log in
          </Link>
        </Typography>
      </form>
    </Card>
  )
}
