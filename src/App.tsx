import React, {FC, useEffect} from 'react';
import './styles/App.sass';
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {IUser} from "./models/models";

const App: FC = () => {




    return (
        <>
            <Navbar/>
            <AppRouter/>
        </>

    );
}

export default App;
