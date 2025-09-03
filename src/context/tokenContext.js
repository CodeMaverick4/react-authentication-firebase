import { createContext, useState } from "react";

export const tokenContext = createContext(null);

const TokenContextProvider = ({children})=>{
    const [accessToken,setAccessToken] = useState(null);
    return(
        <tokenContext.Provider value={{accessToken,setAccessToken}}>
            {children}
        </tokenContext.Provider>
    )
}

export default TokenContextProvider