import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useForgetPasswordMutation } from '../../redux/api/authApi'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { isErrorWithMessage } from '../../utils/helpers'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
  const [forgetPassword, { isSuccess }] = useForgetPasswordMutation()
  const [email, setEmail] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [isSendMail, setIsSendMail] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await forgetPassword({ email: email }).unwrap()
    } catch (error) {
      if (isErrorWithMessage(error)) {
        if (error.status === 404) {
          toast.error('email not found :(')
          if (emailRef.current) {
            emailRef.current?.focus()
          }
        } else if (error.status === 401) {
        }
      }
    }
  }

  useEffect(() => {
    isSuccess && setIsSendMail(true)
    !isSuccess && setIsSendMail(false)
  }, [isSuccess])

  useEffect(() => {
    Boolean(email) && validateEmail()
    !Boolean(email) && setErrorEmail('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  const emailRef = useRef<HTMLInputElement | null>(null)
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      setErrorEmail('Please enter a valid email address')
    } else {
      setErrorEmail('')
    }
  }
  return (
    <>
      {!isSendMail && (
        <Card color='transparent' shadow={false} className='border border-gray-300 bg-white p-5'>
          <Typography variant='h4' color='blue-gray'>
            Forget Password
          </Typography>
          <form className='mb-2 mt-8 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
              <div>
                <label className={classNames('mb-2 block text-sm font-bold', {})} htmlFor='email'>
                  Email
                </label>
                <input
                  ref={emailRef}
                  type='text'
                  id='email'
                  className={classNames('block w-full rounded-lg border  p-2.5 text-sm')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {Boolean(errorEmail) && <div className='text-red-700'>{errorEmail}</div>}
            <Button className='mt-6' fullWidth type='submit'>
              Reset
            </Button>
            <Typography color='gray' className='mt-4 text-center font-normal'>
              {`Have an account? `}
              <Link to='/login' className='font-medium text-blue-500 transition-colors hover:text-blue-700'>
                Log in
              </Link>
            </Typography>
          </form>
        </Card>
      )}
      {isSendMail && (
        <div
          className={
            'mb-2 mt-8 flex w-80 max-w-screen-lg flex-col items-center gap-1 border border-gray-300 bg-white p-5 sm:w-96'
          }
        >
          <EnvelopeIcon className={'h-10 w-10 text-green-500'} />
          <p className={'text-2xl font-semibold'}>Check Your Email</p>
          <p className={'text-center'}>
            Please check the email address associated with the email <span className={'text-blue-500'}>{email}</span>{' '}
            for instructions to reset your password.
          </p>
        </div>
      )}
    </>
  )
}

export default ForgetPassword
