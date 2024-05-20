import React from 'react'
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/slices/SearchSlice';

const Navbar = () => {

  const dispatch = useDispatch();
  return (
    <nav className="flex flex-col lg:flex-row justify-between py-3 mx-6 mb-10">
        <div>
            <h3 className="text-xl font-bold text-gray-600">{ new Date().toUTCString().slice(0,16)}</h3>
            <h1 className="text-2xl font-bold">Flavour-Beer_Shop</h1>
        </div>
        <div>
            <input type="search" name="search" id="" placeholder="Search here" autoComplete='off'
            onChange={(e)=>dispatch(setSearch(e.target.value))}
            className="p-1 border border-gray-200 text-sm rounded-lg outline-none w-full lg:w-[25vw]
            "/>
        </div>
    </nav>
  )
}

export default Navbar;