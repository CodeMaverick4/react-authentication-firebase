import { createContext, useState } from "react";

export const tokenContext = createContext(null);

const TokenContextProvider = ({children})=>{
    const token = localStorage.getItem('token') || null;
    const [accessToken,setAccessToken] = useState(token);
    return(
        <tokenContext.Provider value={{accessToken,setAccessToken}}>
            {children}
        </tokenContext.Provider>
    )
}

export default TokenContextProvider