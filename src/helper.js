import axios from "axios";

export const getCart = async (user) => {
  if (!user || !user._id) {
    throw new Error("User is not defined or _id is missing");
  }
  const res = await axios.get(`https://beer-shop-backend-1.onrender.com/api/get-cart/${user._id}`);
  const data = await res.data;
  return data;
};
