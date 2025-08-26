import { useState } from "react";

export default function Prueba() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("click!", count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Contador: {count}</h1>
      <button onClick={handleClick}>Sumar</button>
    </div>
  );
}
