import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // importamos useLocation
import axios from "axios";
import "../register/register.css";
import { useContext } from "react";
import { CartContext } from "../../context/context";

const Register = () => {
  //  recibimos la función del padre app
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); //  hook para redirigir
  const location = useLocation(); //  obtenemos desde dónde vino

  const { handleRegisterSuccess } = useContext(CartContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSuccess(null); //reseta el mensaje anterior
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        password,
      });

      setSuccess(response.data.message || "Usuario registrado correctamente");
      setError(null); //resetea el mensaje anterior

      localStorage.setItem("token", response.data.token);
      //  Guardamos email en localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);

      //  notificamos al App.js que el usuario se registró y quedó logueado
      handleRegisterSuccess(email, name);

      //  redirigir dinámicamente al lugar desde donde vino o al home
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);

      // Limpiamos campos
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response?.data?.error || "Error en el registro");
      setSuccess(null);
    }
  };

  //  función para ir al login desde el registro
  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.state?.from } });
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/*  Botón para ir a login */}
      <button className="login-button" onClick={handleLoginRedirect}>
        Already have an account? Log in
      </button>
    </div>
  );
};

export default Register;
