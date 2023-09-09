import React from 'react';
import './styles/App.sass';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Registration from "./components/RegistrationForm/Registration";

function App() {
  return (
      <div>
          <Registration/>
        <AppRouter/>
      </div>

  );
}

export default App;
