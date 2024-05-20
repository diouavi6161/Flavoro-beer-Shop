import React, {useEffect, useState} from 'react'
import BeerData from '../data/BeerData'
import { useDispatch,useSelector } from 'react-redux'
import { setCategory } from '../redux/slices/CategorySlice'
const CategoryMenu = () => {

  const [categories , setCategories] = useState([])

  const  ListUniqueCategories = ()=>{
    const uniqueCategories = [
       ...new Set(BeerData.map((beer)=> beer.category))]
      setCategories(uniqueCategories)
      console.log(uniqueCategories)

  }
  useEffect(()=>{
    ListUniqueCategories()
  },[])

  const dispatch = useDispatch() 
  const selectedCategory = useSelector((state)=>state.category.category)

  return (
    <div className="ml-6">
        <h3 className="text-xl font-semibold">Choose Me for your Enterntainment</h3>
        <div className="my-5 flex gap-3 overflow-x-scroll scroll-smooth lg:overflow-x-hidden">

        <button onClick={()=>dispatch(setCategory("All"))}
                   className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-green-500
            hover:text-white ${selectedCategory ==="All" && "bg-green-500 text-white" }`}>All</button>
            
            {
              categories.map((category,index)=>{
                return (
                  <button onClick={()=>dispatch(setCategory(category))}
                  key={index} className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-green-500
            hover:text-white ${selectedCategory === category && "bg-green-500 text-white" }`}>{category}</button>
                )
              })
            }
        </div>
    </div>
  )
}

export default CategoryMenu