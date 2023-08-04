import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Header from './Compnents/Header';
import Routers from './Compnents/Routers';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">      
      <Header/>
      <ToastContainer />
      <Routers />
    </div>
  );
}

export default App;
