import axios from "axios";

export const getCart = async (user)=>{
    const res = await axios.get(`https://beer-shop-backend-1.onrender.com/api/get-cart/${user._id}`)
    const data = await res.data
    return data
}