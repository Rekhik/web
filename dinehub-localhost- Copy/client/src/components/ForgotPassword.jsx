import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = ({ title }) => {



    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/sendpasswordlink', {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email })
        })

        const data = await response.json();
        console.log(data)

        const result = data.status
        if (result === 201) {
            
            toast.success("Email sent")

        } else {
            toast.warning("Something went wrong!")

        }
    }



    return (


        <div className=''>


            <div class="login-box w-[95%] px-4 py-8 sm:w-[60%] lg:w-[40%]  ">

                <form>
                    <h1 className='text-white flex flex-wrap justify-center mb-8 text-md font-semibold'>Verify Email</h1>
                    <div class="user-box">
                        <input type="text" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setEmail(e.target.value)} />
                        <label className='text-xs sm:text-sm' >Email</label>
                    </div>

                    <div class="user-box">
                        <button class="button p-4 rounded-md w-full my-8 text-xs sm:text-sm font-bold justify-center text-white bg-gray-400" onClick={handleSubmit}>{title}</button>
                    </div>


                </form>
            </div>
            <ToastContainer
                            position="top-left"
                            autoClose={5000}
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

export default ForgotPassword
