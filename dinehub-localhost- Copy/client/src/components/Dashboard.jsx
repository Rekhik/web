import React, { useState, useEffect, useContext } from 'react'
import NavigationBar from './NavigationBar.jsx'
import ScrollSlider2 from './ScrollSlider2.jsx'
import ScrollSlider from './ScrollSlider.jsx'
import './Dashboard.css'
import Features from './Features.jsx'
import Footer from './Footer.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import './Button.css'
import Loader from './Loader.jsx'
import { LoginContext } from './contextApi/context.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ theme, setTheme, title }) => {
  const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');


  const navigate = useNavigate();
  const { id } = useParams();


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
      navigate(`/dashboard/${id}`);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      // setDataLoad(true)
    }, 1000)

  }, [])









  const handleSubmit = async (e) => {
    e.preventDefault();

     if (contactEmail == '') {
      toast.warning("Email is required")

    } else if (contactMessage == '') {
      toast.warning("Message is required")

    }
    else if (!contactEmail.includes('@')) {
      toast.warning("Invalid email")

    }  else {



      const response = await fetch('http://localhost:8080/contact', {
        method: 'post',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ contactEmail, contactMessage })
      })

      const data = await response.json();
      

      const result = data.status
      if (result === 201) {

        toast.success("Email sent")
        setContactEmail('')
        setContactMessage('')
      }
    }


  }




  return (
    <>
      {/* {
        data ? ( */}
          <div className='bg-[#F3F7F3] dark:bg-[#080C14]'>
            <NavigationBar theme={theme} setTheme={setTheme} />

            <div className='h-80 bg-[#D7E4DE] dark:bg-[#0C1213] '>
              <div className='flex flex-wrap justify-center items-center pt-16'>
                <img src="food/logo.png" alt="" />
                <p className='text-sm md:text-xl font-bold my-4 dark:text-gray-300'>100% Genuine Products</p>
              </div>

              <h1 className='text-sm flex flex-wrap justify-center sm:text-2xl dark:text-gray-300 font-bold'>Tasty & Healthy Organic Food</h1>
              <div className='flex flex-wrap justify-center mb-32 mt-4'>



                <button class="button w-40 flex flex-wrap justify-center p-3" onClick={() => navigate(`/shop/${id}`)}>

                  {title}
                </button>
              </div>

            </div>


            <ScrollSlider />
            <ScrollSlider2 />

            <Features />

            <form class="form sm:mx-8 p-2 my-4 sm:my-8 ">
              <div className='flex flex-wrap justify-center w-full '>
                <h1 className=" font-extrabold text-3xl heading md:mb-12 mt-12 mb-8 dark:text-gray-300">Contact us</h1>
              </div>

              <input type="text" placeholder="Your email" class="input" onChange={(e) => setContactEmail(e.target.value)} />
              <textarea placeholder="Your message" onChange={(e) => setContactMessage(e.target.value)}></textarea>

              <button class="button sm:w-40 w-32 flex flex-wrap justify-center p-3" onClick={handleSubmit}>

                SUBMIT
              </button>
            </form>


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

        {/* ) : (
          <Loader />
        )
      } */}

    </>



  )




}

export default Dashboard
