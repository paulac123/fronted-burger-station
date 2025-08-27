import axios from "axios";

const API_URL = "https://backend-burger-station.onrender.com/api/menu";
//  función para obtener todos los productos
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener products", error);
    throw error;
  }
};
