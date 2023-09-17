import React, {FC, useEffect} from 'react';
import './styles/App.sass';
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

const App: FC = () => {


    const {setUser, setIsAuth} = useActions()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({username: localStorage.getItem('username' || '')} as IUser)
            setIsAuth(true);
        }
    }, [])

    return (
        <div>
            <Navbar/>
            <AppRouter/>
        </div>

    );
}

export default App;
