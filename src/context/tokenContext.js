import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const tokenContext = createContext(null);

const TokenContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token') || null;
    const [accessToken, setAccessToken] = useState(token);

    useEffect(() => {
        if (accessToken) {
            let expiredIn = localStorage.getItem('autoLogout')
            let timer;
            if (!expiredIn) {
                timer = setTimeout(() => {
                    setAccessToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('autoLogout');
                    navigate('/');
                }, 5000);
                localStorage.setItem('autoLogout', Date.now() + 5000);
            } else {
                let currentTime = Date.now();
                const remaningtime = expiredIn - currentTime;
                timer = setTimeout(() => {
                    setAccessToken(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('autoLogout');
                    navigate('/');
                }, remaningtime);
                localStorage.setItem('autoLogout', remaningtime);
            }
        }
    }, [accessToken]);

    return (
        <tokenContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </tokenContext.Provider>
    )
}

export default TokenContextProvider