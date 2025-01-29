import React, { useState } from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom'

const Signup = ({ title }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // if(!email.length == 0 || !password.length == 0 || !name.length == 0){
    //     toast.warning("All fields are necessary")

    // }else if (!email.includes("@")) {
    //     toast.warning("email is incorrect")
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !password){
            toast.warning("All fields are necessary")
    
        }else if (!email.includes("@")) {
            toast.warning("email is incorrect")
        }else{

        

        const response = await fetch('http://localhost:8080/register', {
            method: 'post',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await response.json();
        const result = data.status
        if (result === 201) {
            toast.success("Signup Successfully")

            setTimeout(()=>{
                navigate('/')
            },1500)
            

        } else {
            toast.warning('User already exist')

        }
    }
}

    return (
        <div>

            <div className=''>
                <div class="login-box w-[95%] px-4 py-8 sm:w-[60%] lg:w-[40%]  ">

                    <form>
                        <div class="user-box">
                            <input type="text" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setName(e.target.value)} />
                            <label className='text-xs sm:text-sm'>Username</label>
                        </div>

                        <div class="user-box">
                            <input type="text" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setEmail(e.target.value)} />
                            <label className='text-xs sm:text-sm'>Email</label>
                        </div>


                        <div class="user-box">
                            <input type="password" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setPassword(e.target.value)} />
                            <label className='text-xs sm:text-sm'>Password</label>
                        </div>


                        <div class="user-box">
                            <button class="button p-4 rounded-md w-full my-8 text-xs sm:text-sm font-bold justify-center text-white bg-gray-400" onClick={handleSubmit}>{title}</button>
                        </div>

                        <div>
                            <label className='text-xs sm:text-sm font-semibold text-white '> Have an account?<span className='text-green-500 cursor-pointer' onClick={() => navigate('/')}> Login </span></label>
                        </div>


                    </form>
                </div>

            </div>
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

export default Signup
