import SearchButton from './SearchButton'

export default function SearchBar() {
  return (
    <div className={'rounded bg-gray-100 py-1'}>
      <div className={'mx-4 my-6 '}>
        <SearchButton />
      </div>
      <div className={'mx-4'}>
        <p className={'mb-3'}>Popular destinations</p>
        <div>Place template x 5</div>
      </div>
    </div>
  )
}
