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
import axios from 'axios'

const Cart = ({ theme, setTheme }) => {



  const [data, setData] = useState(false);
  const [cartData, setCartData] = useState([])
  const [total, setTotal] = useState([])




  const navigate = useNavigate();
  const { id } = useParams();
  const { cartLength, setCartLength } = useContext(LoginContext);

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

      // setLoginData(data)
      navigate(`/cart/${id}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      // setDataLoad(true)
    }, 1000)

  }, [])



  const fetchUser = async () => {

    const response = await fetch(`http://localhost:8080/fetchCartData/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': "application/json"
      },

    })

    const data = await response.json();

    setCartData(data.mainUser)
    setCartLength(data.mainUser.length)
    
  }


  useEffect(() => {
    fetchUser()
    
  }, [cartLength, cartData])

 

  //total price

  const calculateTotalPrice = () => {
    const totalPrice = cartData.reduce((total, item) => total + parseFloat(item.total), 0);
    return totalPrice;
  };
  const totalPrice = calculateTotalPrice();



  //delete item
  const deleteItem = async (elem) => {

    setCartData([...cartData.filter(e => e !== elem)])

    const response = await fetch(`http://localhost:8080/deleteItem/${id}`, {
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

  const checkOut = async () => {
    let amount = totalPrice;
    try {
      const { data } = await axios.post("http://localhost:8080/checkout", { amount })



      const options = {
        key: data.api_key,
        amount: data.order.amount,
        currency: "INR",
        name: "Dinehub",
        description: "Pay for your added items",
        // image: {},
        order_id: data.order.id,
        "handler": function (response) {
          navigate(`/dashboard/${id}`)
          setTimeout(() => {
            toast.success("Payment successfull")
          }, 2000)
          toast.success("Payment successfull")
        },

        prefill: {
          name: "xxxxxxxxx",
          email: "xxxxxx@example.com",
          contact: "9999999999"
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#080C14"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.log('err', err)
    }

  }











  //quantity increment
  const handleIncrement = async (quantity, id,price) => {

    

    const response = await fetch('http://localhost:8080/update', {
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ quantity: quantity + 1, id ,price})

    })

    const data = await response.json();
    console.log(data)
  }


    //quantity decrement

  const handleDecrement = async (quantity, id,price) => {
    if (quantity >= 2) {


      const response = await fetch('http://localhost:8080/update', {
        method: 'post',
        headers: {
          'Content-Type': "application/json"
        },
        body:JSON.stringify({quantity : quantity - 1, id,price})
  
      })
  
      const data = await response.json();
      console.log(data)
    }else{
      toast.warning("You reach limit")
    }
  }


  return (


    <>
      {/* {
        data ? ( */}
      <div className='bg-[#F3F7F3] dark:bg-[#080C14]'>
        <NavigationBar theme={theme} setTheme={setTheme} />
        <div>

          {
            cartData.length === 0 ? <div className='flex flex-wrap justify-center items-center flex-col h-96 md:h-[60vh]'>
              <h1 className='sm:text-3xl dark:text-white text-xl font-extrabold flex flex-wrap justify-center'>YOUR CART IS EMPTY</h1>
              <p className='my-4 text-sm dark:text-white sm:text-lg'>Add items that you like to your CART.</p>
              <button className='button p-3 w-32  flex flex-wrap justify-center' onClick={() => navigate(`/shop/${id}`)}>SHOP</button>
            </div> : (
              <div className="overflow-x-auto mt-8  py-4  xl:mb-56   sm:mx-8 mx-4">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>IMAGE</Table.HeadCell>
                    <Table.HeadCell>PRODUCT</Table.HeadCell>
                    <Table.HeadCell>PRICE</Table.HeadCell>
                    <Table.HeadCell>QUANTITY</Table.HeadCell>
                    <Table.HeadCell>TOTAL</Table.HeadCell>
                    <Table.HeadCell>REMOVE</Table.HeadCell>


                  </Table.Head>
                  <Table.Body className="divide-y">

                    {
                      cartData && cartData.map && cartData.map((elem, id) => {
                       
                        return (
                          <Table.Row key={id}>
                            <Table.Cell className='text-gray-700 dark:text-gray-400 '>
                              <div className='w-20'>
                                <img src={`/${elem.image}`} alt="image" className='sm:h-16 rounded-full sm:w-16 h-12 w-12' />
                              </div>
                            </Table.Cell>
                            <Table.Cell className='text-gray-700 dark:text-gray-400'>{elem.title}</Table.Cell>
                            <Table.Cell className='text-gray-700 dark:text-gray-400 '>{elem.price}</Table.Cell>
                            <Table.Cell className='text-gray-700 dark:text-gray-400'>
                              <div className='flex flex-wrap gap-2 w-32'>

                                <h1 className='bg-gray-300 p-1 w-6 flex flex-wrap justify-center items-center h-full rounded-md cursor-pointer font-bold dark:text-black' onClick={() => handleDecrement(elem.quantity, elem._id,elem.price)}>-</h1>
                                <div className='flex flex-wrap justify-center items-center'>
                                  <h1>{elem.quantity}</h1>
                                </div>

                                <h1 className='bg-gray-300 p-1 w-6 flex flex-wrap justify-center items-center dark:text-black h-full rounded-md cursor-pointer font-bold' onClick={() => handleIncrement(elem.quantity, elem._id,elem.price)}>+</h1>
                              </div>
                            </Table.Cell>
                            <Table.Cell className='text-gray-700 dark:text-gray-400'>{elem.quantity * elem.price}</Table.Cell>

                            <Table.Cell className=''>
                              <button class=""><RiDeleteBin6Line className='hover:text-red-500 dark:text-gray-400 text-gray-700' onClick={() => deleteItem(elem)} /></button>

                            </Table.Cell>
                          </Table.Row>
                        )
                      })
                    }




                  </Table.Body>


                  <tfoot className=''>


                    <tr >
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th colSpan={1} className='text-xs md:text-sm p-2'>Items In Cart <span className='ml-2 mr-2'>:</span><span className='text-red-600 '>{cartLength}</span></th>
                      <th colSpan={1} className='text-xs md:text-sm p-2'>Total Price<span className='ml-2 mr-2'>:</span><span className='text-red-600'>{totalPrice}</span></th>
                      <th colSpan={1}><button className='button  rounded-md p-3 cursor-pointer' onClick={checkOut}>CHECKOUT</button></th>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            )
          }



        </div>



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
      </div>
      {/* ) : (<Loader />)
      } */}
    </>




  )
}

export default Cart
