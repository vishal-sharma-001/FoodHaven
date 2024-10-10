import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { CiSliderHorizontal } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ResContext from "../utils/ResContext";
import useOnlineStatus from '../utils/useOnlineStatus'

export const FoodSuggestions = (    ) => {
    const res = useContext(ResContext)
    const [carData, setCarData] = useState([])
    
    const leftCarousal = () => {
        
    }
    const rightCarousal = () => {
        
    }

    useEffect(() => {
        if (res && res[0]?.card?.card?.imageGridCards?.info) {
            setCarData(res[0].card.card.imageGridCards.info);
        }
    })

    return (
        <div>
            <h3 className='font-bold text-xl'>What's on your mind?</h3>
            <div className='flex justify-end mr-20 text-gray-400 text-xl'>
                <FaArrowCircleLeft className='carousal-controls-btn mr-1' onClick={leftCarousal} />
                <FaArrowCircleRight className='carousal-controls-btn' onClick={rightCarousal} />
            </div>
            <div className='carousal-ctr flex overflow-hidden'>
                {
                    carData? carData.map((data, idx) => {
                        return <img className="w-60 h-52 object-contain" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" + data.imageId} key={idx} />
                    }) : null
                }
            </div>
        </div>
    )
}


export const Restaurants = () => {

    const res = useContext(ResContext)

    const [resData, setResData] = useState([])

    useEffect(() => {
        if (res && res[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
            setResData(res[0].card.card.imageGridCards.info);
        }
    })

    const [is4PlusFilter, setIs4PlusFilter] = useState(false)


    const resRating4Plus = () => {
        setResData(resData.filter((res) => (res?.avgRating > 4.1)))
        setIs4PlusFilter(!is4PlusFilter)
    }
    return (
        <div className='restaurants-ctr py-10'>
            <h3 className="font-bold text-xl">Restaurants with online food delivery in Bangalore</h3>
            <div className='filters py-7 flex justify-start'>
            <button className='btn'>Filter <CiSliderHorizontal className="text-l m-2"/></button>
            <button className='btn'>Sort By <IoChevronDownOutline className="text-l m-2"/></button>
            <button className='btn'>Fast Delivery</button>
            <button className='btn'>New</button>
            <button className='btn' onClick={resRating4Plus}> Ratings 4.0+</button>
            <button className='btn'>Pure Veg</button>
            <button className='btn'>Offers</button>
            <button className='btn'>Rs. 300-Rs. 600</button>
            <button className='btn'>Less than Rs. 300</button>
            </div>
            <div className='restaurants-card-ctr flex flex-wrap'>
                {
                    resData ? resData.map((data) => {
                            return <Link to={"/menu/" + data?.info?.id}><RestaurantCard key={data?.info?.id} prop={data?.info} /></Link>
                    }) : null
                }
            </div>
        </div>
    )
}

export const RestaurantCard = ({res}) => {
    return (
        <div key={res?.id} className="flex flex-col p-0 m-5 shadow-lg rounded-md transition-transform transform hover:scale-105 hover:bg-slate-100 duration-300 ease-in-out">
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + res?.cloudinaryImageId}  className="w-80 h-72 object-fill" />
            <div className="px-2">
                <h4>{(res?.aggregatedDiscountInfoV3?.header || '.') + (res?.aggregatedDiscountInfoV3?.subHeader || '')}</h4>
                <p id='res-name'>{res?.name}</p>
                <p id="rating-time"><MdStars id='res-rating' /> {res?.avgRating} • {res?.sla.deliveryTime} min</p>
                <p id="cuisines">{res?.cuisines.join(', ')}</p>
                <p id="locality"> {res?.locality}</p>
            </div>
        </div>
    )
}

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