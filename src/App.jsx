import { useState, useEffect } from "react";
import Navbar from "./app/components/Navbar";
import Home from "./app/pages/Home";
import ProductDetails from "./app/pages/ProductDetails";
import Cart from "./app/pages/Cart";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <ToastContainer 
        position="top-right" 
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
        style={{ fontSize: '14px' }}
      />
    </div>
  );
}
