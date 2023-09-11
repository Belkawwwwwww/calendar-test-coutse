import React from 'react';
import './styles/App.sass';
import {BrowserRouter, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/RegistrationForm/Registration";
import LoginForm from "./components/LoginForm/LoginForm";
import AppRouter from "./components/AppRouter";

function App() {
  return (
      <div>
          <Navbar/>
          <AppRouter/>
      </div>

  );
}

export default App;
