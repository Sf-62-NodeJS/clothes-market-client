import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from '../Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App () {
  return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </main>
        </BrowserRouter>
  );
}
export default App;
