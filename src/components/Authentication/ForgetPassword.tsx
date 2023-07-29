import React, { useEffect, useState } from 'react'
import { Button, Card, Typography } from '@material-tailwind/react'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useForgetPasswordMutation } from '../../redux/api/authApi'

const ForgetPassword = () => {
  const navigate = useNavigate()
  const [forgetPassword] = useForgetPasswordMutation()
  const [email, setEmail] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(email)
      await forgetPassword({ email: email }).unwrap()
      navigate('/login')
    } catch (e) {}
    //handle something
    // navigate('/reset')
  }
  useEffect(() => {
    Boolean(email) && validateEmail()
    !Boolean(email) && setErrorEmail('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      setErrorEmail('Please enter a valid email address')
    } else {
      setErrorEmail('')
    }
  }
  return (
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
  )
}

export default ForgetPassword
