import { CiSliderHorizontal } from "react-icons/ci";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdStars } from "react-icons/md";
import { useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addRestaurants, addFilteredRestaurants, toggleFilter} from '../utils/restaurantSlice';


export const RestaurantCard = ({prop}) => {
    const res = prop
    return (
        <div key={res?.id} className="w-72 h-80 flex-col p-0 m-5 shadow-lg rounded-md transition-transform transform hover:bg-slate-200 duration-300 ease-in-out">
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/" + res?.cloudinaryImageId}  className="w-72 h-44 object-cover object-top rounded-xl" />
            <div className="px-2">
                <h4 className="overflow-hidden absolute left-2 top-36 text-white font-extrabold text-lg">{(res?.aggregatedDiscountInfoV3?.header || '') + (res?.aggregatedDiscountInfoV3?.subHeader || '')}</h4>
                <p className='overflow-hidden font-semibold py-1'>{res?.name}</p>
                <p className="overflow-hidden rating-time font-medium"> <MdStars className='text-green-900 text-2xl pb-1 inline-block' /> {res?.avgRating} • {res?.sla.deliveryTime} min</p>
                <p className="overflow-hidden cuisines font-normal text-sm text-gray-500">{res?.cuisines.join(', ')}</p>
                <p className="overflow-hidden locality font-normal text-sm text-gray-500"> {res?.locality}</p>
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
                <label className="absolute z-10 ml-5 text-white text-sm bg-black rounded-lg p-1 ">Top Rated</label>
                <RestaurantCard prop = {prop}/>
            </div>
        )
    }   
}


const  TopRatedRestaurantCard  = TopRated(RestaurantCard)

export default Restaurants = () => {
    
    const dispatch = useDispatch()
    const filteredData = useSelector((store)=>(store.restaurants.filteredRestaurantsList))
    const resData = useSelector((store)=>(store.restaurants.restaurantsList))


    const activeFilters = useSelector((store) => store.restaurants.activeFilters); // Get active filters from Redux

    // Function to determine the button class based on filter state
    const getButtonClass = (filterName) => {
        return activeFilters[filterName] ? 'btn-active' : 'btn'; // Apply active class if the filter is active
    };

    return (
        <div className='restaurants-ctr py-10'>
            <h3 className="font-bold text-xl">Restaurants with online food delivery in Bangalore</h3>
            <div className='filters py-7 flex justify-start'>
                <button className='btn'>Filter <CiSliderHorizontal className="text-l m-2" /></button>
                <button className='btn'>Sort By <IoChevronDownOutline className="text-l m-2" /></button>
                <button className={getButtonClass('fastDelivery')} onClick={() => dispatch(toggleFilter('fastDelivery'))}> Fast Delivery </button>
                <button className={getButtonClass('new')} onClick={() => dispatch(toggleFilter('new'))}> New </button>
                <button className={getButtonClass('rating4Plus')} onClick={() => dispatch(toggleFilter('rating4Plus'))}>Ratings 4.0+</button>
                <button className={getButtonClass('pureVeg')} onClick={() => dispatch(toggleFilter('pureVeg'))}> Pure Veg </button>
                <button className={getButtonClass('offers')} onClick={() => dispatch(toggleFilter('offers'))}> Offers </button>
                <button className={getButtonClass('priceRange300To600')} onClick={() => dispatch(toggleFilter('priceRange300To600'))}> Rs. 300-Rs. 600 </button>
                <button className={getButtonClass('priceRangelessThan300')} onClick={() => dispatch(toggleFilter('priceRangelessThan300'))}> Less than Rs. 300 </button>
            </div>
            <div className='restaurants-card-ctr flex flex-wrap'>
                {
                    filteredData ? filteredData.map((data, idx) => {
                            return <Link to={"/menu/" + data?.info?.id} key={data?.info?.id}> {data?.info?.avgRating > 4.5 ?  <TopRatedRestaurantCard key={data?.info?.id} prop={data?.info} /> : <RestaurantCard key={data?.info?.id} prop={data?.info} />}</Link>
                    }) : null
                }
            </div>
        </div>
    )
}