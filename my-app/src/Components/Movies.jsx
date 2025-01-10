import React from 'react'
import Moviecard from './Moviecard'
import Pagination from './Pagination'


import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
function Movies({handleAddtoWatchList , handleRemoveFromWatchlist , watchlist}) {
  const[movies , setMovies] = useState([])
  const[pageNo, setPageNo]= useState(1)

const handlePrev = ()=> {
  if (pageNo===1) {
    setPageNo(1)
  } 
  else{
    setPageNo(pageNo-1)
  }

}

const handleNext=()=>{
  setPageNo(pageNo+1)
}

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=128b28c1e9aebeb2ed4dc1a60cff3cfa&language=en-US&page=${pageNo}`).then((res) => {
        setMovies(res.data.results) // Logging the data from the response
      })
      
  }, [pageNo]);


  return (
    <div className='p-5'>
      <div className = 'text-center m-5 font-bold text-xl' >Trending Movies</div>
      <div className='flex flex-row flex-wrap justify-around  gap-8'>
        
         {movies.map((movieObj)=>{
              return <Moviecard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/>
         })}

      </div>

       <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  )
}

export default Movies

