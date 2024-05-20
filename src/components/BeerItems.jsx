import React from "react";
import BeerCard from "./BeerCard";
import BeerData from "../data/BeerData";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
const BeerItems = () => {

  const category = useSelector((state)=>state.category.category);
  const search = useSelector((state)=>state.search.search);

  const handleToast =(name)=>{
    toast.success(`${name} added to you Cart`)
  }
  return (
    <>

<Toaster
  position="top-center"
  reverseOrder={false}
/>
    
    <div className="flex flex-wrap gap-10 justify-center lg:justify-start mx-6 my-10">
      {
        BeerData.filter((beer)=>{
          if(category === "All"){
            return beer.name.toLowerCase().includes(search.toLowerCase());
          }else{
           return( category === beer.category && beer.name.toLowerCase().includes(search.toLowerCase()));
           
          }
        }).map((beer)=>(<BeerCard
          key={beer.id}
          id={beer.id}
          name={beer.name}
          price={beer.price}
          desc={beer.desc}
          rating={beer.rating}
          img={beer.img}
          handleToast={handleToast}
        />))
      }
      

     { /*BeerData.map((beer) => {
        return (
          <BeerCard
            key={beer.id}
            id={beer.id}
            name={beer.name}
            price={beer.price}
            desc={beer.desc}
            rating={beer.rating}
            img={beer.img}
            handleToast={handleToast}
          />
        );
      })*/}

    </div>
    </>
  );
};

export default BeerItems;
