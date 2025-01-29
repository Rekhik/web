import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Heart = ({ elem }) => {
  const [fav, setFav] = useState(false)

  const { id } = useParams();



  const handleCartData = async (item) => {

    const response = await fetch(`http://localhost:8080/favourite/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(item)
    })

    const data = await response.json();

    const result = data.status
    if (result === 201) {

      toast.success("Added successfully")
    }
  }

  return (
    <div onClick={() => {
      setFav(!fav)
      handleCartData
    }}>
      {
        fav ? <img src="/heart.png" alt="" className='h-8 w-8 cursor-pointer' /> : <img src="/love.png" alt="" className='h-8 w-8 cursor-pointer' />
      }
    </div>
  )
}

export default Heart
