import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems)
  const totalQty = cartItems.reduce(
    (totalQty, item) => totalQty + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const navigate = useNavigate();
  const checkout = async () =>{
    const res = await axios.get("http://localhost:5001/api/checkout")
    const {url} = await res.data
    window.location.href = url
  }
  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[20vw] h-full p-5 bg-white mb-3 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-3">
          <span className="text-xl font-bold text-gray-700">My Order</span>
          <IoMdClose
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 border-yellow-700 text-gray-600 font-bold
            p-1 text-xl rounded-md hover:text-green-400 hover:border-green-400 cursor-pointer"
          />
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((beer) => {
            return (
              <ItemCard
                key={beer.id}
                {...beer}
              />
            );
          })
        ) : (
          <h2 className="text-center text-xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>
        )}

        <div className="absolute bottom-0">
          <h3 className="font-semibold text-ray-800">Items :{totalQty}</h3>
          <h3 className="font-semibold text-ray-800">
            Total Amount : {totalPrice}
          </h3>
          <hr className="w-[90vw] lg:w-[18vw] my-2" />
          <button
            onClick={checkout}
            className="bg-red-500 font-bold px-3 text-black py-2 rounded-lg w-[90vw] 
        lg:w-[18vw] mb-5"
          >
            Checkout
          </button>
        </div>
      </div>

      <FaShoppingCart
        onClick={() => setActiveCart(!activeCart)}
        className={`rounded-full bg-white hover:text-purple-400 shadow-md text-5xl p-3 fixed bottom-4 right-4 ${
          totalQty > 0 && "animate-bounce delay-500 transition-all"
        }`}
      />
    </>
  );
};

export default Cart;
