import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useState, useContext, useEffect} from 'react';
import ResContext from "../utils/ResContext";
import useOnlineStatus from '../utils/useOnlineStatus';
import Restaurants from "./Restaurants";
import { useSelector } from "react-redux";

export default Body =() =>{
    const onlinestatus = useOnlineStatus()

    if(onlinestatus == false)
        return <div> Your Intenet is not working properly.</div>


    return(
        <div className='p-10'>
            <FoodSuggestions />
    
            <hr id="rule"></hr>
            <Restaurants />
        </div>
    )
}

export const FoodSuggestions = () => {
    const resData = useSelector((store)=>(store.restaurants.restaurantsList))
    const leftCarousal = () => {
        
    }
    const rightCarousal = () => {
        
    }

    return (
        <div>
            <h3 className='font-bold text-xl'>What's on your mind?</h3>
            <div className='flex justify-end mr-20 text-gray-400 text-xl'>
                <FaArrowCircleLeft className='carousal-controls-btn mr-1' onClick={leftCarousal} />
                <FaArrowCircleRight className='carousal-controls-btn' onClick={rightCarousal} />
            </div>
            <div className='carousal-ctr flex overflow-hidden'>
                {
                    resData ? resData[0]?.card?.card?.imageGridCards?.info.map((data, idx) => {
                        return <img className="w-60 h-52 object-contain" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + data.imageId} key={idx} />
                    }) : null
                }
            </div>
        </div>
    )
}
