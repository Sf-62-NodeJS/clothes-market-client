import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Header from '../Main/Header';
import Login from '../Main/Login';
import Error from '../Main/Error';
import Logout from '../Main/Logout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App () {
  return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                    <Route path="/error" element={<Error />}></Route>
                </Routes>
            </main>
        </BrowserRouter>
  );
}
export default App;
