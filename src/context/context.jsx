import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [counter, setCounter] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  //  función para manejar logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // eliminamos token
    localStorage.removeItem("email"); // eliminamos email
    localStorage.removeItem("name"); // eliminamos nombre
    setUserEmail(""); // limpiamos el estado para que desaparezca del navbar
    setUserName(""); // limpiamos el nombre
  };

  const handleLoginSuccess = ({ email, name }) => {
    setUserEmail(email);
    setUserName(name);
    localStorage.setItem("email", email); //  guardamos email al logear
    localStorage.setItem("name", name); // guardamos el nombre
  };

  //  función para manejar registro exitoso
  const handleRegisterSuccess = (email, name) => {
    setUserEmail(email); // actualizamos estado
    setUserName(name);
    localStorage.setItem("email", email); //  guardamos email para sesión persistente
    localStorage.setItem("name", name); // guardamos el nombre
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name");
    if (savedEmail) {
      setUserEmail(savedEmail); // mantenemos sesión abierta al recargar
    }
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setCounter((prev) => prev + 1);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const clearCart = () => {
    setCart([]);
    setCounter(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        counter,
        setCounter,
        userEmail,
        setUserEmail,
        handleLogout,
        handleLoginSuccess,
        handleRegisterSuccess,
        userName,
        setUserName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
