import React, { useContext } from "react";
import { CartContext } from "../../context/context";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import Search from "../search/Search";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  // usamos el contexto para traer el couter
  const { counter, userEmail, handleLogout, userName } =
    useContext(CartContext);
  console.log({ userEmail, userName });
  const navigate = useNavigate(); //  hook para redirigir

  // función wrapper solo para redirigir después de cerrar sesión
  const logout = () => {
    handleLogout(); // llama al contexto → limpia token, email y estado
    navigate("/"); // redirige al home o login
  };

  return (
    <nav className="navbar">
      <img src="logo/logoburger.png" alt="logo" width="70" />

      <Search query={searchQuery} onChange={setSearchQuery} />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Si no hay usuario logueado mostramos Login y Registro */}
        {!userEmail && (
          <>
            <li>
              <Link to="/user">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        <li>
          <Link className="cart-link" to="/cart">
            🛒 {counter}
          </Link>
        </li>

        {/*  si hay usuario logueado mostramos el email + botón cerrar sesión */}

        {userEmail && (
          <li className="user-info">
            <span>{userName || userEmail}</span>
            <button className="logout-btn" onClick={logout}>
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
