import { createContext, useState } from "react";

export let tokenContext = createContext()

export default function TokenContextProvider({ children }) {
    let [token, setToken] = useState(null);
    let [user , setUser] = useState('')
    return <tokenContext.Provider value={{ token , setToken ,user , setUser}} >
        {children}
    </tokenContext.Provider>
}
