import React from 'react'

interface PropsState {
  setPlaceName: any
  setPlaceDescription: any
  setPlaceAddress: any
}
const AddDetails = ({ setPlaceName, setPlaceDescription, setPlaceAddress }: PropsState) => {
  return (
    <>
      <div>
        <label className={'mb-3 block font-semibold uppercase'}>Name Place</label>
        <input
          onChange={(e) => setPlaceName(e.target.value)}
          type='text'
          className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold uppercase'}>Description</label>
        <textarea
          onChange={(e) => setPlaceDescription(e.target.value)}
          className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'}
        />
      </div>
      <div>
        <label className={'mb-3 block font-semibold uppercase'}>Address</label>
        <input
          type='text'
          onChange={(e) => setPlaceAddress(e.target.value)}
          className={'w-4/6 rounded-lg  border  p-3 focus:outline-none'}
        />
      </div>
    </>
  )
}

export default AddDetails
