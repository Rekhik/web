import { useState, useEffect, useContext } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Shop from './components/Shop'
import Cart from './components/Cart'
import Error from './components/Error'
import { LoginContext } from './components/contextApi/context'
import Loader from './components/Loader'
import ForgotPassword from './components/ForgotPassword'
import UpdatePass from './components/UpdatePass'
import Favourite from './components/Favourite'

function App() {

  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')

    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, [theme])



  // const [data, setData] = useState(false);
  const { logindata, setLoginData } = useContext(LoginContext);
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
      // DashboardValid();
      // setData(true)
    }, 1000)

  }, [])



  return (

    <>
      {/* {
        data ? ( */}

          <Routes>
            <Route path='/' element={<Login title='LOGIN' />} />
            <Route path='/signup' element={<Signup title='SIGN UP' />} />
            <Route path='/dashboard/:id' element={<Dashboard theme={theme} setTheme={setTheme} title="SHOP" />} />
            <Route path='/shop/:id' element={<Shop theme={theme} setTheme={setTheme} />} />
            <Route path='/cart/:id' element={<Cart theme={theme} setTheme={setTheme} />} />
            <Route path='/forgot' element={<ForgotPassword title='VERIFY' />} />
            <Route path='/update/:id/:token' element={<UpdatePass title='UPDATE' />} />
            <Route path='/favourite/:id' element={<Favourite theme={theme} setTheme={setTheme}/>} />

            

          </Routes>


        {/* ) : (<Loader />)
      } */}


      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login title='LOGIN' />} />
          <Route path='/signup' element={<Signup title='SIGN UP' />} />
          <Route path='/dashboard' element={<Dashboard theme={theme} setTheme={setTheme} title="SHOP" />} />
          <Route path='/shop' element={<Shop theme={theme} setTheme={setTheme} />} />
          <Route path='/cart' element={<Cart theme={theme} setTheme={setTheme} />} />
          <Route path='*' element={<Error theme={theme} setTheme={setTheme} />} />

        </Routes>

      </BrowserRouter> */}
    </>


  )
}

export default App
