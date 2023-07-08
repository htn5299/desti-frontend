import React, { useEffect, useState } from 'react'
import { Avatar, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { useUpdateProfileMutation } from '../../redux/api/userApi'
import EmptyAvatar from '../../assets/profile/avatar.png'
import { RootState, useAppSelector } from '../../redux/store'
import * as process from 'process'

const EditProfileLayout = () => {
  const navigate = useNavigate()
  const [updateProfile] = useUpdateProfileMutation()
  const profile = useAppSelector((state: RootState) => state.user)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [avatarFile, setAvatarFile] = useState<File>()
  const [about, setAbout] = useState<string>('')
  useEffect(() => {
    return () => {
      selectedImage && URL.revokeObjectURL(selectedImage)
    }
  }, [selectedImage])
  useEffect(() => {
    if (profile) {
      const { name, email } = profile
      const { avatar, about } = profile.profile
      setName(name)
      setEmail(email)
      avatar && setSelectedImage(`${process.env.REACT_APP_AWS_URL}${avatar}`)
      about ? setAbout(about) : setAbout('')
    }
  }, [profile])

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const urlPreview = URL.createObjectURL(file)
      setAvatarFile(file)
      setSelectedImage(urlPreview)
    }
  }
  const handleUpdate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const formData = new FormData()
    about && formData.append('about', about)
    avatarFile && formData.append('file', avatarFile)
    try {
      await updateProfile(formData)
      navigate(`/users/${profile?.id}`)
    } catch (e) {}
  }
  return (
    <form className={'mt-8 flex w-full flex-col gap-6 rounded-lg border border-gray-300 bg-white p-4'}>
      <Typography variant='h3'>Edit Your Profile</Typography>
      <div>
        <label className={'mb-3 block font-semibold'}>USERNAME</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>EMAIL</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          className={'w-4/6 rounded-lg border p-3 focus:outline-none'}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>PROFILE IMAGE</label>
        <Avatar className={'mr-4 h-20 w-20'} src={selectedImage || EmptyAvatar} alt={'asd'}></Avatar>
        <input
          type='file'
          accept='image/*'
          className={'file:rounded-lg file:border-0 file:bg-gray-300 file:px-2 file:py-1'}
          onChange={imageChange}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>ABOUT</label>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'}
        />
      </div>
      <div className={'flex gap-3'}>
        <button
          onClick={handleUpdate}
          className={' rounded-lg bg-red-400 px-2 py-3 font-semibold uppercase text-white md:px-5 lg:px-20'}
        >
          Update Profile
        </button>
        <button
          onClick={() => navigate(`/users/${profile?.id}`)}
          className={
            ' rounded-lg border border-gray-500 px-2 py-3 font-semibold uppercase text-gray-500 md:px-5 lg:px-16'
          }
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditProfileLayout
