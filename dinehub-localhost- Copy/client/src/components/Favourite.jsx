// import React, { useState, useEffect, useContext } from 'react'
// import { useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NavigationBar from './NavigationBar'
// import { useNavigate } from 'react-router-dom'
// import { LoginContext } from './contextApi/context.jsx'


// const favourite = ({ theme, setTheme }) => {


//     const [data, setData] = useState(false);
//     const [cartData, setCartData] = useState([])
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { logindata, setLoginData } = useContext(LoginContext);




//     const DashboardValid = async () => {
//         let token = localStorage.getItem("tokenValue");

//         const res = await fetch("http://localhost:8080/validuser", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": token
//             }
//         });

//         const data = await res.json();


//         if (data.status == 401) {
//             localStorage.removeItem("tokenValue")
//             navigate('/')
//             console.log("user not valid");
//         } else {
//             console.log("user verify");
//             setLoginData(data)
//             navigate(`/favourite/${id}`);
//         }
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             DashboardValid();
//             setData(true)
//         }, 2000)

//     }, [])




//     const fetchUser = async () => {

//         const response = await fetch(`http://localhost:8080/fetchData/${id}`, {
//             method: 'get',
//             headers: {
//                 'Content-Type': "application/json"
//             },

//         })

//         const data = await response.json();
//         console.log(data)
//         setCartData(data.mainUser)
//         // setCartLength(data.mainUser.length)
//     }


//     useEffect(() => {
//         fetchUser()
//     }, [])

//     // setCartData([...cartData.filter(e => e !== elem)])
//     const deleteItem = async (elem) => {

//         setCartData([...cartData.filter(e => e !== elem)])

//         const response = await fetch(`http://localhost:8080/deleteFavItem/${id}`, {
//             method: 'delete',
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify(elem)

//         })

//         const data = await response.json();

//         if (data.status === 201) {

//             toast.error("Deleted successfully")

//         } else {
//             console.log('err')
//         }

//     }









//     const handleCartData = async (item) => {
//         console.log(item)
//         const response = await fetch(`http://localhost:8080/addToCart/${id}`, {
//             method: 'post',
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify(item)
//         })

//         const data = await response.json();

//         const result = data.status
//         // console.log(data)
//         if (result === 201) {
//             toast.success("Added successfully")
//         }
//     }










//     return (
//         <div className='bg-[#F3F7F3] dark:bg-[#080C14]'>
//             <NavigationBar theme={theme} setTheme={setTheme} />

//             <div className='bg-[#F3F7F3] dark:bg-[#080C14] flex flex-wrap gap-4 justify-center mt-8'>


//                     {
//                         cartData.map && cartData.map((elem, id) => {
//                             console.log(elem)
//                             return (
//                                 <div className=" cursor-pointer card w-64 h-60 sm:h-72 sm:w-72  bg-base-100 dark:bg-gray-300 shadow-xl p-1" key={id}>
//                                     <figure ><img src={`/${elem.image}`} alt="Shoes" className='h-80 sm:h-60 w-full object-cover' /></figure>
//                                     <div className='p-2'>
//                                         <h1 className='sm:text-xl text-sm font-bold'>{elem.title}</h1>
//                                         <p className='my-2 text-xs'>{elem.desc}</p>
//                                         <div className='flex flex-wrap justify-between items-center gap-4'>
//                                             <h1 className=' text-md sm:text-xl font-extrabold text-green-500'>${elem.price}</h1>

//                                             <div className='flex flex-wrap items-center gap-2'>
//                                                 <div >
//                                                     <button className='bg-red-600 text-white font-semibold p-1 sm:p-2 rounded-lg w-20 flex flex-wrap justify-center' onClick={() => deleteItem(elem)}>DELETE</button>
//                                                 </div>


//                                             </div>

//                                         </div>
//                                         <button className='bg-green-600 mt-4 w-full text-white font-semibold p-1 sm:p-2 rounded-lg  flex flex-wrap justify-center' onClick={() => handleCartData(elem)}>ADD</button>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }


//             </div>


//             <ToastContainer
//                 position="top-left"
//                 autoClose={1000}
//                 hideProgressBar={false}
//                 newestOnTop
//                 closeOnClick
//                 ltr={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//                 transition:Bounce
//             />
//         </div>
//     )
// }

// export default favourite
















import React, { useState, useEffect, useContext } from 'react'
import NavigationBar from './NavigationBar'
import { Table, TableBody } from "flowbite-react";
import Footer from './Footer'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom'
import Loader from './Loader'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from './contextApi/context.jsx'


const favourite = ({ theme, setTheme }) => {



    const [data, setData] = useState(false);
    const [cartData, setCartData] = useState([])
 

    const navigate = useNavigate();
    const { id } = useParams();
    const { logindata, setLoginData } = useContext(LoginContext);
    const [quantity, setQuantity] = useState(1)


   
  const DashboardValid = async () => {
    let token = localStorage.getItem("tokenValue");

    const res = await fetch("http://localhost:8080/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();


    if (data.status == 401) {
      localStorage.removeItem("tokenValue")
      navigate('/')

    } else {

      setLoginData(data)
      navigate(`/favourite/${id}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      // setDataLoad(true)
    }, 1000)

  }, [])



    const fetchUser = async () => {

        const response = await fetch(`http://localhost:8080/fetchData/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': "application/json"
            },

        })

        const data = await response.json();

        setCartData(data.mainUser)

    }


    useEffect(() => {
        fetchUser()
    }, [])


    const deleteItem = async (elem) => {

        setCartData([...cartData.filter(e => e !== elem)])

        const response = await fetch(`http://localhost:8080/deleteFavItem/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(elem)

        })

        const data = await response.json();

        if (data.status === 201) {

            toast.error("Deleted successfully")

        } else {
            console.log('err')
        }

    }


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


    return (


        <>
            
                    <div className='bg-[#F3F7F3] dark:bg-[#080C14]'>
                        <NavigationBar theme={theme} setTheme={setTheme} />
                        <div className=' h-[40vh] md:h-[48vh] xl:h-[56vh]'>

                            {
                                cartData.length === 0 ? <div className='flex flex-wrap justify-center items-center flex-col '>
                                    <h1 className='sm:text-3xl dark:text-white text-xl font-extrabold flex flex-wrap justify-center'>YOUR WISHLIST IS EMPTY</h1>
                                    <p className='my-4 text-sm dark:text-white sm:text-lg'>Add items that you like to your CART.</p>
                                    <button className='button p-3 w-32  flex flex-wrap justify-center' onClick={() => navigate(`/shop/${id}`)}>SHOP</button>
                                </div> : (
                                    <div className='flex flex-wrap justify-center gap-4 sm:mx-8 sm:mt-8 sm:mb-16'>
                                        {
                                            cartData.map((elem, id) => {

                                                return (
                                                    <div className=" cursor-pointer card w-64 h-60 sm:h-72 sm:w-72  bg-base-100 dark:bg-gray-300 shadow-xl p-1" key={id}>
                                                        <figure ><img src={`/${elem.image}`} alt="Shoes" className='h-80 sm:h-60 w-full object-cover' /></figure>
                                                        <div className='p-2'>
                                                            <h1 className='sm:text-xl text-sm font-bold'>{elem.title}</h1>
                                                            <p className='my-2 text-xs'>{elem.desc}</p>
                                                            <div className='flex flex-wrap justify-between items-center gap-4'>
                                                                <h1 className=' text-md sm:text-xl font-extrabold text-green-500'>${elem.price}</h1>

                                                                <div className='flex flex-wrap items-center gap-2'>
                                                                    <div >
                                                                        <button className='bg-red-600 text-white font-semibold p-1 sm:p-2 rounded-lg w-20 flex flex-wrap justify-center' onClick={() => deleteItem(elem)}>DELETE</button>
                                                                    </div>


                                                                </div>

                                                            </div>
                                                            <button className='bg-green-600 mt-4 w-full text-white font-semibold p-1 sm:p-2 rounded-lg  flex flex-wrap justify-center' onClick={() => handleCartData(elem)}>ADD</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>




                                )
                            }



                        </div >



                        <Footer />


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
                    </div >
                
        </>




    )
}

export default favourite
