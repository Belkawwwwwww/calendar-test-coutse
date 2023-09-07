import React from 'react';
import './styles/App.sass';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";

function App() {
  return (
      <div>
          <Navbar/>
          <Registration/>
        <AppRouter/>
      </div>

  );
}

export default App;
