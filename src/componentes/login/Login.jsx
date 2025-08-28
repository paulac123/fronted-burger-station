import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../login/login.css";
import { useContext } from "react";
import { CartContext } from "../../context/context";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); //para redirigir
  const location = useLocation(); //  obtenemos de dónde viene el usuario

  const { handleLoginSuccess } = useContext(CartContext);

  const handleLogin = async (e) => {
    e.preventDefault(); //con esto no se recarga
    try {
      const response = await axios.post(
        "https://backend-burger-station.onrender.com/api/login",
        {
          email: emailInput,
          password,
        }
      );
      console.log("Login response user:", response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("name", response.data.user.name);

      setError(null);

      console.log("Login API user:", response.data.user);

      handleLoginSuccess({
        email: response.data.user.email,
        name: response.data.user.name,
      });

      //  redirige al lugar desde donde vino  cart o al home
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (error) {
      setError(error.response?.data?.error || "No se encuentra ese usuario");
    }
  };

  // función para redirigir al registro
  const handleRegisterRedirect = () => {
    //  mandamos también el "from" para que al registrarse sepa volver
    navigate("/user", { state: { from: location.state?.from } });
  };

  return (
    <div className="login-container">
      <h1 className="login">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Botón para ir a registro */}
      <button onClick={handleRegisterRedirect}>
        Don't have an account? Register
      </button>
    </div>
  );
};

export default Login;
