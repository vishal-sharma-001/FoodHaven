import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Logo from '../utils/images/logo.png';

import { useEffect, useState, useContext } from 'react' 
import ResContext from "../utils/ResContext";

export default Header = () =>{
    const {resData, filteredData, setFilteredData} =  useContext(ResContext)
    const [searchFilter, setSearchFilter] = useState("")
    

    const  restaurants = filteredData ? filteredData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants: null
    useEffect(() =>{    
        if(searchFilter == "")
            setFilteredData(resData)
        
        else{
            console.log(restaurants.filter((res)=>{
                return res.info.name.toLowerCase().includes(searchFilter.toLowerCase())
            }))
            
            setFilteredData( restaurants && restaurants.filter((res)=>{
                return res.info.name.toLowerCase().includes(searchFilter.toLowerCase())
            }))
        }
    },[searchFilter])
    
    // console.log(restaurants)

    return (
        <div className='flex justify-start items-baseline px-10 pb-4 shadow-md min-w-[1800px] overflow-hidden'>
            <div className='mr-20 relative top-2'>
                <img className='object-contain w-[200px] h-auto max-w-full' src={Logo} alt='logo' />
            </div>
            <div className='flex mr-52'>
                <IoLocationOutline  className="text-3xl mr-2" id="location-icon" />
                <input className='location-input w-40 h-7 p-2' type='search' placeholder='Location'/>
            </div>
            <div className='flex mr-32'>
                <label htmlFor='food-search'>
                    <FaSearch  className="text-2xl mr-2" id="search-icon"/>    
                </label>
                <input type='search' className="w-40 h-7 p-2" id='food-search' placeholder='Search...' value={searchFilter} onChange={(e)=> setSearchFilter(e.target.value)}/>
            </div>
            <div className='flex'>
                <div className='icons text-3xl mx-16'>
                    <BiSolidOffer />
                </div>
                <div  className='icons text-3xl mx-16'>
                    <Link to="/help"><IoIosHelpBuoy id ="help" /></Link>
                </div>
                <div  className='icons text-2xl mx-16'>
                    <FaRegUserCircle/>
                </div>
                <div  className='icons text-2xl mx-16'>
                    <FaShoppingCart />
                </div>
            </div>
        </div>
    );
}