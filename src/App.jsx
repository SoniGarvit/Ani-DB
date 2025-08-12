import { useState, useEffect } from 'react'
import './App.css'
import AnimeContent from './AnimeContent'
import Header from './Header'
import Footer from './Footer'

function App() {
  const [anime, setAnime] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(2)
  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const searchText = search ? search : null

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${keyword ? keyword : null}&page=${currentPage}&limit=24`)
        if (!response.ok) throw new Error("Could not fetch data ")
        const data = await response.json()
        setAnime(data.data)
        console.log(data.data)
        setLoading(false)

      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchMovie()
  }, [keyword, currentPage])


  const handleClick = () => {
    if (search) {
      setKeyword(search)
      setCurrentPage(1)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const handleNext = () => {
    setCurrentPage(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrev = () => {
    currentPage > 1 ? setCurrentPage(prev => prev - 1) : null
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetToOne = () => {
    setKeyword("")
    setCurrentPage(2)
  }

  if (loading) {
    return <p className='text-center mt-10 text-yellow-400 text-2xl'>Loading....</p>
  }

  if (error) {
    return <p className='text-center mt-10 text-red-400 text-4xl'>Unexpected Error Occured</p>
  }


  return (
    <>
      <Header reset={resetToOne} />
      <main className="grid grid-cols-1 place-items-center w-full">
        <h1 className='text-2xl py-2.5 text-white self-auto sm:text-3xl sm:pb-5 md:text-4xl '>Ani-Finder</h1>
        <form onSubmit={handleSubmit} className='flex items-center gap-2   w-52 h-8 sm:w-60 sm:gap-3.5
        md:w-68'>
          <input type="text" name="search" id="search" value={search || ""} onChange={(e) => { setSearch(e.target.value) }} placeholder='e.g. Naruto' className="bg-gray-100 border border-solid border-black rounded-md px-1 py-2 h-6 text-xs sm:w-60 md:w-68 sm:h-8" />
          <button onClick={handleClick} type="submit" className=" cursor-pointer bg-yellow-300 hover:bg-yellow-200 text-xs font-semibold p-1 border border-gray-400 rounded-md sm:text-sm sm:py-1 sm:px-0.5">Search</button>
        </form>

        <div className="">
          {!loading && <AnimeContent data={anime} />}
        </div>

        {!loading && <div className="flex justify-around text-white w-9/10 h-auto mt-6 sm:mt-3">
          <button onClick={handlePrev} className='cursor-pointer bg-white hover:bg-gray-300 text-black py-1 px-1.5 rounded-lg text-xs sm:text-[14px] md:text-[16px] '>Prev</button>
          <button onClick={handleNext} className='cursor-pointer bg-white hover:bg-gray-300 text-black py-1 px-1.5 rounded-lg text-xs sm:text-[14px] md:text-[16px] '>Next</button></div>}
      </main>
      <Footer />
    </>
  )
}

export default App
