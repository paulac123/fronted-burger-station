import "./productCard.css";
import { useContext } from "react";
import { CartContext } from "../../context/context";

const ProductCard = ({ product }) => {
  //usamos el contexto la funcion de agregar al carrito
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!product.id) {
      console.error("El producto no tiene id:", product);
      return;
    }

    //incrementa el carrito
    addToCart({ ...product });
  };

  return (
    <div className="product-card">
      {/* Cambio principal: concatenamos la URL completa del backend */}
      <div className="image-container">
        <img
          src={`https://backend-burger-station.onrender.com${product.image}`}
          alt={product.name}
          className="product-image"
        />
      </div>
      <h2 className="name">{product.name}</h2>
      <p className="description">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <button className="comprar" onClick={handleAddToCart}>
        +
      </button>
    </div>
  );
};

export default ProductCard;
