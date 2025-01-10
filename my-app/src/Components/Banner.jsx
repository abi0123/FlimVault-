import React from 'react'

function Banner() {
  return (
    <div className = 'h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end' style={{backgroundImage : 'url(https://www.pixelstalk.net/wp-content/uploads/images2/Avengers-infinity-war-4k-logo-Image.jpg)'}}>
        <div className='text-white text-xl text-center w-full bg-gray-900/60 p-3'>Avengers Infinity War</div>
    </div>
  )
}

export default Banner
