export default function SearchBar() {
  return (
    <form className='w-48 md:w-64 lg:w-80'>
      <div className='relative'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-500 '
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <input
          type='text'
          placeholder='Search Place'
          className='w-full rounded-full bg-gray-100 py-2 pl-12  pr-4 placeholder-gray-500 outline-none focus:bg-gray-200 '
        />
      </div>
    </form>
  )
}
