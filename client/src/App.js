import React, {useEffect} from 'react'
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from './routers'
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/auth.context";
import Navbar from "./componetns/Navbar";
import Loader from "./componetns/Loader";
import {useMessage} from "./hooks/message.hook";
import {useHttp} from "./hooks/http.hook";

function App() {
    const {logIn, logOut, token, userID, ready} = useAuth();
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated);

    const message = useMessage()

    const {error, clearError} = useHttp()
    useEffect(() => {
        message(error)
        clearError();
    },[error, message, clearError])

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{logIn, logOut, token, userID, isAuthenticated}}>
            <BrowserRouter>
                {isAuthenticated && <Navbar/>}
                <div>
                    <div className='container'>{routes}</div>
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App
