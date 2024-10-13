import { CiSliderHorizontal } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ResContext from "../utils/ResContext";


export const RestaurantCard = ({prop}) => {
    const res = prop
    return (
        <div key={res?.id} className=" w-80 h-pxflex flex-col p-0 m-5 shadow-lg rounded-md transition-transform transform hover:scale-105 hover:bg-slate-100 duration-300 ease-in-out">
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + res?.cloudinaryImageId}  className="" />
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


//Restaurant card promoted -> is a higher order function, it takes a component and returns a component
export const TopRated = (RestaurantCard) =>{
    //at the end of the a higher order component is also a component so it should return -> a compoennt
    return ({prop}) => {
        //this is the component which will be returned

        //each component returns some JSX
        return (
            <div>
                <label className="absolute z-10 ml-5 text-white bg-black">Top Rated</label>
                <RestaurantCard prop = {prop}/>
            </div>    
        )
    }   
}


const  TopRatedRestaurantCard  = TopRated(RestaurantCard)

export default Restaurants = () => {

    const {resData, filteredData, setFilteredData} = useContext(ResContext)
    const [is4PlusFilter, setIs4PlusFilter] = useState(false)

    const res = filteredData ? filteredData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants : null

    const resRating4Plus = () => {
        setFilteredData( res && res.filter((r) => (r?.info?.avgRating > 4.2)))
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
                    res ? res.map((data, idx) => {
                            return <Link to={"/menu/" + data?.info?.id} key={data?.info?.id}> {data?.info?.avgRating > 4 ?  <TopRatedRestaurantCard key={data?.info?.id} prop={data?.info} /> : <RestaurantCard key={data?.info?.id} prop={data?.info} />}</Link>
                    }) : null
                }
            </div>
        </div>
    )
}