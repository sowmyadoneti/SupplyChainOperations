import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import './App.css';

function App() {
  return (
    <div
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '600px', // ✅ reduced size
            margin: '2rem auto',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100vh - 100px)',
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
