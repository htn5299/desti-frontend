import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'
import classNames from 'classnames'
import { useNavigate, useParams } from 'react-router-dom'
import { useResetPasswordMutation } from '../../redux/api/authApi'
import { isErrorWithMessage } from '../../utils/helpers'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { id } = useParams<{ id: string }>()
  const [resetPassword] = useResetPasswordMutation()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isMatch, setIsMatch] = useState(true)
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
  const inputPwdRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault()
    try {
      await resetPassword({ id: String(id), password: password }).unwrap()
      navigate('/login')
    } catch (error) {
      console.log('error')
      if (isErrorWithMessage(error)) {
        if (error.status === 410) {
          toast.error(error.data.message as string)
          navigate('/login')
        } else if (error.status === 400) {
          setErrorPassword(error.data.message[0])
          if (inputPwdRef.current) {
            inputPwdRef.current.focus()
          }
        }
        setConfirmPassword('')
      }
    }
  }
  return (
    <Card color='transparent' shadow={false} className='border border-gray-300 bg-white p-5' onSubmit={handleSubmit}>
      <Typography variant='h4' color='blue-gray'>
        Reset Password
      </Typography>

      <form className='mb-2 mt-8 w-80 max-w-screen-lg sm:w-96' autoComplete={'off'}>
        <div className='flex flex-col gap-3'>
          <div>
            <label
              className={classNames('mb-2 block text-sm font-semibold', {
                'text-red-700 dark:text-red-500': Boolean(errorPassword)
              })}
              htmlFor='password'
            >
              Password
            </label>
            <input
              ref={inputPwdRef}
              type='password'
              id='password'
              name='password'
              className={classNames('block w-full rounded-lg border  p-2.5 text-sm')}
              autoComplete='none'
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
              <span className='font-medium '>{errorPassword}</span>
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
              autoComplete='none'
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
          Reset
        </Button>
      </form>
    </Card>
  )
}

export default ResetPassword
