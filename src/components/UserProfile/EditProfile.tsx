import React from 'react'
import { Link } from 'react-router-dom'

const EditProfile = () => {
  return (
    <ul className={'flex flex-col gap-3 text-gray-800 '}>
      <li>
        <Link to={'/users/edit'}>Edit Profile</Link>
      </li>
      <li>
        <Link to={'/location'}>Create Location</Link>
      </li>
      <li>
        <Link to={'#'}>My Lists</Link>
      </li>
      <li>
        <Link to={'#'}>Feedback & Idea</Link>
      </li>
    </ul>
  )
}

export default EditProfile
