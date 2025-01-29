

import React, { createContext, useState } from 'react'

export const LoginContext = createContext("");

const Context = ({ children }) => {

  const [logindata, setLoginData] = useState("");
  const [cartLength, setCartLength] = useState("");
  

 
  return (
    <>
      <LoginContext.Provider value={{ logindata, setLoginData, cartLength, setCartLength }}>
        {children}
      </LoginContext.Provider>
    </>
  )
}

export default Context
