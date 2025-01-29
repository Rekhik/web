import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ title }) => {

    const [data, setData] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);



    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning("All fields are necessary")

        } else if (!email.includes("@")) {
            toast.warning("email is incorrect")
        } else {


            const response = await fetch('http://localhost:8080/login', {
                method: 'post',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json();

            const status = data.status
            const userId = data.result.userValid._id

            setLoading(true)

            if (status === 201) {
                setLoading(true)

                localStorage.setItem('tokenValue', data.result.token)
                toast.success("Login successfull")
                setLoading(false)

                setTimeout(() => {
                    navigate(`/dashboard/${userId}`)
                }, 15000)


            } else if (status === 501) {
                toast.warning("User not registered")

            }
        }
    }

    useEffect(() => {

        setTimeout(() => {
            setData(true)
        }, [1500])
    }, [])





    const handleSuccess = async (response) => {
        try {

            const decoded = jwtDecode(response.credential);
            const { email, name } = decoded;

            const res = await fetch('http://localhost:8080/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();

            const userId = data.newUser._id

            const result = data.status
            if (result === 201) {
                localStorage.setItem('tokenValue', data.token)
                toast.success("Login succesfull")

                setTimeout(() => {
                    navigate(`/dashboard/${userId}`)
                }, 15000)

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleError = (error) => {
        console.error('Error:', error);
    };





    return (

        <>
            {
                data ? (
                    <div className=''>


                        <div class="login-box w-[95%] px-4 py-8 sm:w-[60%] lg:w-[40%]  ">

                            <form>
                                <div class="user-box">
                                    <input type="text" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setEmail(e.target.value)} />
                                    <label className='text-xs sm:text-sm' >Email</label>
                                </div>
                                <div class="user-box">
                                    <input type="password" name="" required="" className='text-xs sm:text-sm mt-2 sm:mt-3 text-gray-300' onChange={(e) => setPassword(e.target.value)} />
                                    <label className='text-xs sm:text-sm' >Password</label>
                                </div>



                                <div className='flex flex-wrap justify-end'>
                                    <label className='text-xs sm:text-sm font-semibold text-white cursor-pointer' onClick={() => navigate('/forgot')}>Forgot Password?</label>
                                </div>

                                <div class="user-box">
                                    {
                                        loading ? (<h1>loading...</h1>) : (
                                            <button class="button p-4 rounded-md w-full my-8 text-xs sm:text-sm font-bold justify-center text-white bg-gray-400" onClick={handleSubmit}>{title}</button>
                                        )
                                    }
                                    {/* <button class="button p-4 rounded-md w-full my-8 text-xs sm:text-sm font-bold justify-center text-white bg-gray-400" onClick={handleSubmit}>{title}</button> */}
                                </div>

                                <div>
                                    <label className='text-xs sm:text-sm font-semibold text-white '>Don't have an account?<span className='text-green-500 cursor-pointer ' onClick={() => navigate('/signup')}> Sign up </span></label>
                                </div>

                                <div className='mt-8 flex flex-wrap justify-center rounded-lg bg-white p-1'>
                                    <GoogleLogin

                                        onSuccess={handleSuccess}
                                        onFailure={handleError}
                                        clientId="260823959309-nj1jle63p0js250anitnqp7qngm8971s.apps.googleusercontent.com"
                                    >Login with Google</GoogleLogin>
                                </div>

                            </form>
                        </div >

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


                ) : (<Loader />)
            }
        </>



    )
}

export default Login
