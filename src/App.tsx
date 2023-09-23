import React, {FC} from 'react';
import './styles/App.sass';
import Navbar from "./components/Navbar/Navbar";
import AppRouter from "./components/AppRouter";

const App: FC = () => {

    return (
        <>
            <Navbar/>
            <AppRouter/>
        </>

    );
}

export default App;
