import React, { useState } from "react";
import genreids from '../Utility/Genre';
import {useEffect} from "react"

function Watchlist({ watchlist, setWatchList , handleRemoveFromWatchlist }) {

  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre , setCurrGenre] = useState('All Genres')

  const handleSearch = (e) => {
    setSearch(e.target.value);


  };

  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }

  const sortIncreasing = () => {
    // Create a new copy of the watchlist before sorting
    const sortedIncreasing = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });

    setWatchList(sortedIncreasing);
  };

  const sortDecreasing = () => {
    // Create a new copy of the watchlist before sorting
    const sortedDecreasing = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });

    setWatchList(sortedDecreasing);
  };

  useEffect(()=>{
    let temp = watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
  })
  temp = new Set(temp)
    setGenreList(['All Genres', ...temp])
  },[watchlist])

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre)=>{
       
          return <div onClick ={()=>handleFilter(genre)} className={currGenre==genre?"flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4" : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"}>
           {genre}
      </div>
       })}
        
        
        
      </div>
      <div className="flex justify-center my-9">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for Movies"
          className="h-[3rem] w-[10rem] bg-gray-200 outline-none"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>
                <div className="flex justify-center items-center">
                  <i
                    onClick={sortIncreasing}
                    className="fa-solid fa-arrow-up cursor-pointer mx-2"
                  ></i>
                  Ratings
                  <i
                    onClick={sortDecreasing}
                    className="fa-solid fa-arrow-down cursor-pointer mx-2"
                  ></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              
            </tr>
          </thead>
          <tbody>
            {watchlist && watchlist.length > 0 ? (
              watchlist.filter((movieObj) => {
                if(currGenre=='All Genres'){
                  return true
                }else{
                  return genreids[movieObj.genre_ids[0]]==currGenre;
                }
              })
                .filter((movieObj) =>
                  movieObj.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((movieObj) => (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[6rem] w-[9rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt={movieObj.title}
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-800 cursor-pointer">Delete</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5" className="text-gray-500 py-4">
                  No movies in the watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
