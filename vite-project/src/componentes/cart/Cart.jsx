import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/context";
import axios from "axios";
import "./cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart, userEmail } =
    useContext(CartContext);
  const navigate = useNavigate(); //redirigir

  if (cart.length === 0) {
    return <h2 className="empty-cart">Tu carrito está vacío</h2>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePurchase = async () => {
    if (!userEmail) {
      // si NO está logueado lo mandamos a Login y pasamos "from" para volver aquí
      navigate("/login", { state: { from: "/cart" } });
    } else {
      try {
        // enviamos la orden al backend
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "http://localhost:3000/api/orders", // URL de tu endpoint de crear orden
          {
            products: cart.map((item) => ({
              product_id: item.id,
              quantity: item.quantity,
            })),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, //enviamos el token
            },
          }
        );

        const orderId = response.data.order.id; // id de la orden
        //  redirigimos a la página de éxito
        navigate("/order-success", { state: { userEmail, orderId } });

        clearCart(); //  vaciamos el carrito
      } catch (error) {
        console.error("Error al procesar la compra:", error);
        alert("Hubo un error al procesar la compra. Intenta nuevamente.");
      }
    }
  };

  return (
    <div>
      <h2 className="cart-title">Shopping cart {userEmail || "Guest"}</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li className="cart-item" key={item.id}>
            <img
              src={`http://localhost:3000${item.image}`}
              alt={item.name}
              className="cart-image"
            />
            {item.name} - ${item.price} x {item.quantity}
            <button
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className="clear-cart-button" onClick={clearCart}>
        Empty cart
      </button>
      <button
        className="buy-button"
        style={{ marginLeft: "10px" }}
        onClick={handlePurchase}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
