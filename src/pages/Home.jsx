import React from 'react'
import Navbar from '../components/Navbar'
import CategoryMenu from '../components/CategoryMenu'
import BeerItems from '../components/BeerItems'
import Cart from '../components/Cart'

const Home = () => {
  return (
    <>
    <Navbar/>
    <CategoryMenu/>
    <BeerItems/>
    <Cart/>
    </>
  )
}

export default Home