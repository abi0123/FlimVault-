import "./App.css";
import Banner from "./Components/Banner";
import Navbar from "./Components/Navbar";
import Movies from "./Components/Movies";
import Watchlist from "./Components/Watchlist";

import { useState } from 'react'
import { useEffect } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  let [watchlist , setWatchList] = useState([])


  let handleAddtoWatchList = (movieObj)=>{
    let newWatchList = [...watchlist , movieObj]
    localStorage.setItem('moviesApp' , JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }

  let handleRemoveFromWatchlist = (movieObj)=>{
    let filteredwatchlist = watchlist.filter((movie)=>{
      return movie.id !== movieObj.id
      
    })
      localStorage.setItem('moviesApp', JSON.stringify(filteredwatchlist))
      setWatchList(filteredwatchlist)
  }  

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if (!moviesFromLocalStorage){
      return
    
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  },[])

    
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<> <Banner/> <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} /> </> }/>
          <Route path='/watchlist' element={<Watchlist watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
