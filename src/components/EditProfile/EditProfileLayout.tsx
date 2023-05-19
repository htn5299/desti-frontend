import React, { useEffect, useState } from 'react'
import { Avatar, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const EditProfileLayout = () => {
  const [selectedImage, setSelectedImage] = useState<string>()
  useEffect(() => {
    return () => {
      selectedImage && URL.revokeObjectURL(selectedImage)
    }
  }, [selectedImage])
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const urlPreview = URL.createObjectURL(file)
      setSelectedImage(urlPreview)
    }
  }

  return (
    <form action='' className={'mt-8 flex w-full flex-col gap-6 rounded-lg border border-gray-300 bg-white p-4'}>
      <Typography variant='h3'>Edit Your Profile</Typography>
      <div>
        <label className={'mb-3 block font-semibold'}>USERNAME</label>
        <input type='text' className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'} />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>EMAIL</label>
        <input type='text' className={'w-4/6 rounded-lg border p-3 focus:outline-none'} />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>PROFILE IMAGE</label>
        <Avatar
          className={'mr-4 h-20 w-20'}
          src={
            selectedImage ||
            'https://placewziz-nestjs-uploader.s3.ap-southeast-1.amazonaws.com/9d302243-8d91-47a7-b1c9-ac7d77e70fda_321501975-1754952598221060-6998078121714892766-n.png'
          }
          alt={'asd'}
        ></Avatar>
        <input
          type='file'
          accept='image/*'
          className={'file:rounded-lg file:border-0 file:bg-gray-300 file:px-2 file:py-1'}
          onChange={imageChange}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold'}>ABOUT</label>
        <textarea className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'} />
      </div>
      <div className={'flex gap-3'}>
        <button className={' rounded-lg bg-red-400 px-2 py-3 font-semibold uppercase text-white md:px-5 lg:px-20'}>
          Update Profile
        </button>
        <Link
          to={'..'}
          className={
            ' rounded-lg border border-gray-500 px-2 py-3 font-semibold uppercase text-gray-500 md:px-5 lg:px-16'
          }
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default EditProfileLayout
