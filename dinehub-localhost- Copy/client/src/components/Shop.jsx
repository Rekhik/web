import React, { useState, useEffect, useContext } from 'react'
import NavigationBar from './NavigationBar'
import api from '../Api.jsx'
import { IoMdSearch } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import Card from './Card.jsx'
import { Accordion } from "flowbite-react";
import { LoginContext } from './contextApi/context.jsx'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Footer from './Footer.jsx'


const Shop = ({ theme, setTheme }) => {

  const [data, setData] = useState(api)
  const [search, setSearch] = useState([])
  const [checkbox, setCheckBox] = useState('')
  const { logindata, setLoginData } = useContext(LoginContext);
  const { id } = useParams();
  const navigate = useNavigate()
  const [dataLoad, setDataLoad] = useState(false);




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
      navigate(`/shop/${id}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      // setDataLoad(true)
    }, 1000)

  }, [])





  














  useEffect(() => {

    setSearch(data);

  }, [])

  const handleSearch = (e) => {

    let lowerCase = e.toLowerCase()

    if (search == "") {
      setSearch(data)
    }
    const filterData = data.filter((elem) => {
      return (
        elem.title.toLowerCase().includes(lowerCase)
      )
    })
    setSearch(filterData)
  }


  useEffect(() => {
    if (checkbox == "") {
      setSearch(data)
    }

    const filterData = data.filter((elem) => {
      return (
        elem.category.includes(checkbox)
      )
    })
    setSearch(filterData)

  }, [checkbox])



  return (
    <>

      {/* {
        setDataLoad ? ( */}
          <div className='bg-[#F3F7F3] dark:bg-[#080C14] h-full '>
            <NavigationBar theme={theme} setTheme={setTheme} />

            <div className='p-4 sm:p-8'>
              <form className='flex flex-wrap justify-center ' onChange={(e) => handleSearch(e.target.value)} >
                <div className=' p-0.5 rounded-xl mb-2 flex items-center  w-52 sm:w-80 bg-white shadow-xl shadow-gray-300 dark:shadow-black '>
                  <input type="text" placeholder='Search...' className='rounded-lg ml-1 focus:outline-5 h-10 sm:w-96 w-40 border-none' />
                  <div className='bg-gray-300 p-2 rounded-xl cursor-pointer ml-1.5 sm:mx-2'>
                    <IoMdSearch />
                  </div>
                </div>

                <div className='flex flex-wrap justify-center items-center ' onClick={() => document.getElementById('my_modal_3').showModal()}>

                  <IoFilterSharp className=' text-2xl ml-2 cursor-pointer dark:text-white sm:mb-2' />
                  <dialog id="my_modal_3" className="modal ">
                    <div className="modal-box dark:bg-gray-900">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle dark:border-white btn-ghost absolute right-2 dark:text-white top-2">✕</button>
                      </form>


                      <div className='my-6'>
                        <Accordion collapseAll>
                          <Accordion.Panel>
                            <Accordion.Title className='dark:text-white'>Filter by category</Accordion.Title>
                            <Accordion.Content>

                              <div className='flex gap-4'>
                                <input type="checkbox" value='' className="checkbox" onChange={(e) => setCheckBox(e.target.value)} checked={checkbox === ''} />
                                <p className="mb-2 text-gray-500 dark:text-gray-400">All</p>
                              </div>

                              <div className='flex gap-4 my-2'>
                                <input type="checkbox" value='breakfast' className="checkbox" onChange={(e) => setCheckBox(e.target.value)} checked={checkbox === 'breakfast'} />
                                <p className="mb-2 text-gray-500 dark:text-gray-400">Breakfast</p>
                              </div>

                              <div className='flex mb-2 gap-4'>
                                <input type="checkbox" value='Fruits' className="checkbox" onChange={(e) => setCheckBox(e.target.value)} checked={checkbox === 'Fruits'} />
                                <p className="mb-2 text-gray-500 dark:text-gray-400">Fruits</p>
                              </div>

                              <div className='flex gap-4'>
                                <input type="checkbox" value='lunch' className="checkbox" onChange={(e) => setCheckBox(e.target.value)} checked={checkbox === 'lunch'} />
                                <p className="mb-2 text-gray-500 dark:text-gray-400">Lunch</p>
                              </div>

                            </Accordion.Content>
                          </Accordion.Panel>

                          <Accordion.Panel>

                          </Accordion.Panel>
                        </Accordion>
                      </div>


                    </div>
                  </dialog>


                </div>

              </form>




              <div >


                {
                  search.length != 0 ? <Card data={search} /> : <div className='flex flex-wrap justify-center h-60  items-center'>
                    <h1 className='text-xl font-semibold dark:text-white'>NO DATA FOUND !!</h1>

                  </div>

                }





              </div>

            </div>


            <Footer />


          </div>
        {/* ) : null
      } */}

    </>

  )
}

export default Shop
