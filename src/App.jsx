import "./App.css";
import ProductList from "./componentes/productList/ProductList";
import Navbar from "./componentes/navbar/Navbar";
import { CartProvider } from "./context/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Register from "./componentes/register/Register";
import Login from "./componentes/login/Login";
import Cart from "./componentes/cart/Cart";
import OrderSuccess from "./componentes/orderSucces/OrderSucces";
import PruebaContador from "./componentes/pruebas/prueba";

const Home = () => {
  return <h2></h2>;
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <Router>
        {/*  PASAMOS onLogout al Navbar */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <img src="logo/logoburger.png" alt="logo" width="250" />
                <ProductList searchQuery={searchQuery} />
              </>
            }
          />
          {/*  PASAMOS onRegisterSuccess al Register */}
          <Route path="/user" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
