import { useEffect, useState } from 'react'
import { useCreatePlaceMutation } from '../../redux/api/placesApi'
import { RootState, useAppSelector } from '../../redux/store'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddDetails, AddLocation } from './index'
import { isErrorWithMessage } from '../../utils/helpers'
import MySpinner from '../Skeleton/Spinner'

const AddPlace = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(new FormData())
  const location = useAppSelector((state: RootState) => state.location)
  const [createPlace] = useCreatePlaceMutation()
  const navigate = useNavigate()
  const [placeName, setPlaceName] = useState('')
  const [placeDescription, setPlaceDescription] = useState('')
  const [placeAddress, setPlaceAddress] = useState('')
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const resetFormData = () => {
    setFormData(new FormData())
  }
  const handleCreate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    if (!placeName) {
      toast.error('placeName không được để trống')
      return
    }
    if (!placeDescription) {
      toast.error('placeDescription không được để trống')
      return
    }
    if (!placeAddress) {
      toast.error('placeAddress không được để trống')
      return
    }
    try {
      setIsLoading(true)
      formData.append('name', placeName)
      formData.append('description', placeDescription)
      formData.append('address', placeAddress)
      formData.append('latitude', String(location.latitude))
      formData.append('longitude', String(location.longitude))
      for (let file of files) {
        formData.append('files', file)
      }
      const newPlace = await createPlace(formData).unwrap()
      navigate(`/places/${newPlace.id}`)
    } catch (e) {
      if (isErrorWithMessage(e)) {
        e.status === 422 && toast.error('Image size is less than 10Mb')
      }
      resetFormData()
    } finally {
      setIsLoading(false) // Đặt isLoading là false để ẩn skeleton
      resetFormData()
    }
  }
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const thumbs = files.map((file) => (
    <div
      className={'mb-8 mr-8 box-border inline-flex h-40 w-fit rounded-md border border-gray-300 p-4'}
      key={file.name}
    >
      <div className={'flex min-w-0 overflow-hidden'}>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
          alt={file.preview}
          className={'block h-full w-auto'}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <form className={'mx-auto mt-8 flex w-4/6 flex-col  gap-6 rounded-lg border border-gray-300 bg-white p-4'}>
      <AddDetails
        setPlaceName={setPlaceName}
        setPlaceDescription={setPlaceDescription}
        setPlaceAddress={setPlaceAddress}
      />
      <AddLocation />
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={'border-sky-500 border-2 border-dashed py-3 text-center text-lg font-bold text-gray-500'}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside className={'flex flex-row flex-wrap'}>{thumbs}</aside>
      <button
        onClick={handleCreate}
        className={'  rounded-lg bg-red-400 px-2 py-3 font-semibold uppercase text-white md:px-5 lg:px-20 '}
      >
        {isLoading ? (
          <span>
            {'Creating... '}
            <MySpinner />
          </span>
        ) : (
          'Add a Place'
        )}
      </button>
    </form>
  )
}

export default AddPlace
