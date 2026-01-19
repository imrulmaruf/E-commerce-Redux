import { Routes, Route } from "react-router-dom";
import Navbar from "./app/components/Navbar";
import Home from "./app/pages/Home";
import ProductDetails from "./app/pages/ProductDetails";
import Cart from "./app/pages/Cart";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
