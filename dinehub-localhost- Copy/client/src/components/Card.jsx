import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heart from './Heart';
import { LoginContext } from './contextApi/context.jsx'

const Card = ({ data }) => {

  const [quantity, setQuantity] = useState(1)
 


  const { id } = useParams();
  const navigate = useNavigate()


  const handleCartData = async ({ image, price, title, category }) => {

    const response = await fetch(`http://localhost:8080/addToCart/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ image, price, title, category, quantity })
    })

    const data = await response.json();
    console.log(data)

    const result = data.status

    if (result === 201) {
      toast.success("Added successfully")
    } else if (result === 422) {
      toast.warning("already added")
    }
  }



  const handleFavv = async (item) => {

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
      toast.success("Added to wishlist")
    }
  }


  return (
    <div className='flex flex-wrap gap-4 justify-center mt-8'>
      {
        data?.map((elem, id) => {

          return (
            <div className=" cursor-pointer card w-64 h-60 sm:h-72 sm:w-72  bg-base-100 dark:bg-gray-300 shadow-xl p-1" key={id}>
              <figure ><img src={`/${elem.image}`} alt="Shoes" className='h-80 sm:h-60 w-full object-cover' /></figure>
              <div className='p-2'>
                <h1 className='sm:text-xl text-sm font-bold'>{elem.title}</h1>
                <p className='my-2 text-xs'>{elem.desc}</p>
                <div className='flex flex-wrap justify-between items-center gap-4'>
                  <h1 className=' text-md sm:text-xl font-extrabold text-green-500'>${elem.price}</h1>

                  <div className='flex flex-wrap items-center gap-2'>

                    <div onClick={() => handleFavv(elem)}>
                      <Heart />
                    </div>
                   
                  
                    <button className='button p-1 sm:p-2 rounded-lg w-20 flex flex-wrap justify-center' onClick={() => handleCartData(elem)}>ADD</button>
                  </div>

                </div>
              </div>
            </div>
          )
        })
      }
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        ltr={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  )
}

export default Card
