import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {

  const [token, setToken] = useState({
    aToken: "",
    dToken: "m"
  })

  const value = {
    token,
    setToken
  }

  return <AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>
}

export default AppContextProvider