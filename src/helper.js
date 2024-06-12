import axios from "axios";

export const getCart = async (user) => {
  const res = await axios.get(`http://localhost:5001/api/get-cart/${user._id}`);
  const data = await res.data;
  return data;
};
