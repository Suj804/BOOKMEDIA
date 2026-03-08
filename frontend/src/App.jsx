import React from 'react';
import {Route,Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import BookPage from './pages/BookPage';
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/books" element={<BookPage />} />
        
      </Routes>
    </div>

  )
}

export default App
