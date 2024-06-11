import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../helper";
import { setCart } from "../redux/slices/CartSlice";

const ItemCard = ({ id, price, image, name, quantity, _id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const removeFromCart = async (id) => {
    try {
      const res = await axios.delete(`https://beer-shop-backend-1.onrender.com/api/remove-from-cart/${id}`);
      const data = res.data;
      toast.success(data.message);
      const cartData = await getCart(user);
      dispatch(setCart(cartData.cartItems));
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error:", error);
    }
  };

  const incrementQuantity = async (id) => {
    try {
      const res = await axios.put(`https://beer-shop-backend-1.onrender.com/api/increment-quantity/${id}`);
      const data = await res.data;
      const cartData = await getCart(user);
      dispatch(setCart(cartData.cartItems));
    } catch (error) {
      toast.error("Failed to increment item quantity");
      console.error("Error:", error);
    }
  };

  const decrementQuantity = async (id) => {
    try {
      const res = await axios.put(`https://beer-shop-backend-1.onrender.com/api/decrement-quantity/${id}`);
      const data = await res.data;
      const cartData = await getCart(user);
      dispatch(setCart(cartData.cartItems));
    } catch (error) {
      toast.error("Failed to decrement item quantity");
      console.error("Error:", error);
    }
  };

  // Check if necessary props are provided
  if (!id || !price || !image || !name || !quantity || !_id) {
    console.error("ItemCard props are invalid", { id, price, image, name, quantity, _id });
    return null; // Return null if any of the props are missing
  }

  return (
    <div className="flex gap-2 shadow-md rounded-lg p-2 mb-3 relative">
      <MdDelete
        onClick={() => {
          removeFromCart(_id);
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />
      <img src={image} alt={name} className="w-[90px] h-[90px]" />
      <div className="leading-5">
        <h2 className="font-bold text-gray-800">{name}</h2>
        <div className="flex justify-between">
          <span className="text-green-500 font-bold">₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute right-7">
            <AiOutlineMinus
              onClick={() => {
                if (quantity > 1) {
                  decrementQuantity(_id);
                }
              }}
              className="border-2 border-gray-600 text-gray-600 hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
            <span>{quantity}</span>
            <AiOutlinePlus
              onClick={() => {
                if (quantity >= 1) {
                  incrementQuantity(_id);
                }
              }}
              className="border-2 border-gray-600 text-gray-600 hover:bg-green-500 hover:border-none rounded-md p-1 text-xl transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
