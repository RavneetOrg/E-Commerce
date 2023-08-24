import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ContactPage from "./pages/ContactPage";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import './App.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/products" element={<ProductsPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/product/:id" element={<Product/>}></Route>
        <Route path="/product/*" element={<PageNotFound/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
      </Routes>
  );
}

export default App;
