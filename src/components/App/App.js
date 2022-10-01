import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import Header from '../Main/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App () {
  return (
        <Router>
            <Header />
        </Router>
  );
}
export default App;
