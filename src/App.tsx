import React from 'react';
import './App.css';
import {BrowserRouter, Routes} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";

function App() {
  return (
      <div>
          <Navbar/>
        <AppRouter/>
      </div>

  );
}

export default App;
