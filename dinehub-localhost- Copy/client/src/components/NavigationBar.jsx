import React, { useState,useContext } from 'react'
import { Navbar } from "flowbite-react";
import './NavigationBar.css'
import { NavLink, useNavigate ,useParams} from 'react-router-dom'
import { IoMdHeart } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { RiShoppingCart2Line,RiHeart3Line } from "react-icons/ri";
import Badge from '@mui/material/Badge';
import { LoginContext } from './contextApi/context.jsx'



const NavigationBar = ({ theme, setTheme }) => {
  const navigate = useNavigate()
  const {id} = useParams()
 
  const { cartLength, setCartLength } = useContext(LoginContext);

  const [ham, setHam] = useState(false)

  const handleTheme = () => {
    const changeTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(changeTheme)
    
  }


 const handleLogout = () =>{
  localStorage.removeItem('tokenValue')
  navigate('/')
  }

  return (
    <div>
      <Navbar fluid className='bg-[#F3F7F3] dark:bg-[#080C14] p-4 sm:p-6 lg:p-6 '>
        <div className='border-b-2 border-white flex flex-wrap justify-between items-center w-screen pb-2'>
          <Navbar.Brand >
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl lg:text-3xl cursor-pointer " onClick={() => navigate(`/dashboard/${id}`)}>𝐃𝐢𝐧𝐞𝐡𝐮𝐛</span>
          </Navbar.Brand>
          <div className='flex gap-2 items-center'>


            <div className=' flex flex-wrap justify-center items-center rounded-full cursor-pointer ' onClick={handleTheme}>
            {
              theme === 'dark' ? (
                <img src="/moon.png" alt="" className='h-8 w-8'/>
              ) : (
                <img src="/sun.png" alt="" className='h-8 w-8'/>

              )
            }
            </div>

            <RiHeart3Line className='dark:text-white text-3xl hidden sm:block cursor-pointer' onClick={()=>navigate(`/favourite/${id}`)}/>

            <Badge badgeContent={cartLength}  color="secondary" className=' mr-0.5 ' onClick={() => navigate(`/cart/${id}`)}>
              <RiShoppingCart2Line className='text-black dark:text-white cursor-pointer text-2xl md:text-3xl ' />
            </Badge>


            <input hidden="" class="check-icon hidden" id="check-icon" name="check-icon" type="checkbox" onClick={() => setHam(!ham)} />
            <label class="icon-menu sm:hidden " for="check-icon">
              <div class="bar bar--1 "></div>
              <div class="bar bar--2"></div>
              <div class="bar bar--3"></div>
            </label>

            <button className='button p-2 w-20  flex-wrap justify-center items-center rounded-md ml-2 hidden sm:block' onClick={handleLogout}>𝐋𝐨𝐠𝐨𝐮𝐭</button>

          </div>
        </div>
      </Navbar>


      {
        ham === false ? null : (
          <div className='bg-[#F3F7F3] dark:bg-gray-900 h-40 p-4  '>

            <div className=' my-2 flex flex-wrap justify-center items-center gap-2  border-gray-400 border-b-2 p-2 rounded-md'>
              <IoMdHeart color='red' className='text-md' />
              <NavLink className='text-black  text-md mb-1 dark:text-white' to={`/favourite/${id}`} > 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞𝐬</NavLink>
            </div>

            <div className='flex flex-wrap justify-center items-center gap-2 border-gray-400 border-b-2 p-2 rounded-md' onClick={handleLogout}>
              <TbLogout  color='green' className='text-md' />
              <NavLink className='text-black text-md mb-1 dark:text-white'> 𝐋𝐨𝐠𝐨𝐮𝐭</NavLink>
            </div>

          </div>
        )
      }
    </div>

  )
}

export default NavigationBar
