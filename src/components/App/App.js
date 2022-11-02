import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Home from '../Main/Home';
import Header from '../Main/Header';
import Login from '../Main/Login';
import Error from '../Main/Error';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Products from '../Products/Products';
import SingleProduct from '../SingleProduct/SingleProduct';

function App () {
  return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<SingleProduct />} />
                </Routes>
            </main>
        </BrowserRouter>
  );
}

export default App;
