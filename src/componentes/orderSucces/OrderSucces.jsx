import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { userEmail, orderId } = location.state || {};

  return (
    <div style={{ padding: "50px", textAlign: "center", marginTop: "150px" }}>
      <h1>¡Muchas gracias por tu pedido!</h1>
      {userEmail && <p>Usuario: {userEmail}</p>}
      {orderId && (
        <p style={{ fontSize: "25px" }}>Número de orden: {orderId}</p>
      )}
      <p style={{ fontSize: "22px" }}>Tu pedido está siendo preparado 🚀</p>
    </div>
  );
};

export default OrderSuccess;
