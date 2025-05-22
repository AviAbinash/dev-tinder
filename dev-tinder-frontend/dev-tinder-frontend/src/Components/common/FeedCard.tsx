"use client"
import React from 'react'
import Image from 'next/image'

const FeedCard = () => {
  return (
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='profile-image'>
    <Image
      src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
      alt="Shoes" width={350} height={350} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary">Ignore</button>
       <button className="btn btn-secondary">Intrested</button>
    </div>
  </div>
</div>
  )
}

export default FeedCard