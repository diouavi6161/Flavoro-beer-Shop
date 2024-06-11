import React from 'react'
import {AiFillStar} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, setCart } from '../redux/slices/CartSlice'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getCart } from '../helper'
const BeerCard = ({id,name,price,desc,rating,img, handleToast}) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.user)

  const addToCart = async({id,name,img,price,rating,quantity})=>{
    const res = await axios.post(`http://localhost:5001/api/add-to-cart/${user._id}`,{
      id,image:img,name,price,rating,quantity,
    })
    const data = await res.data
    toast.success(data.message)
    getCart(user).then((data)=> dispatch(setCart(data.cartItems)))
  }
  return (
    <div className="font-bold w-[190px] bg-white p-5 flex flex-col rounded-lg gap-2 ">
        <img src={img} alt="" className="w-auto h-[100px] hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"/>
        <div className="text-sm flex justify-between">
            <h2 >{name}</h2>
            <span className='text-green-500'>₹{price}</span>
        </div>
         <p className="text-sm font-normal">{desc ? (
    desc.length > 20 ? `${desc.slice(0, 20)}...` : desc
  ) : 'Description not available'}
         </p>
         <div className="flex justify-between">
            <span className="flex justify-center items-center">
                <AiFillStar className="mr-1 text-yellow-400"/> {rating}
            </span>
            <button onClick={()=>{
                !user ? toast.error("please login to add to cart")
                : addToCart({id,name,img,price,rating,quantity:1})
            }} className="p-1 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm">Add to Cart</button>
         </div>
    </div>
  )
}

export default BeerCard