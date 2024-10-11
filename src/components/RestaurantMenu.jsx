import { useParams} from 'react-router-dom'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import { IoMdArrowDropdown } from "react-icons/io";
import {useState} from 'react'
import ItemsList from './ItemsList';


export default RestaurantMenu = () => {
    const param = useParams()
    const data = useRestaurantMenu(param.resid)  //custom hook
    const [showItems, setShowItems] = useState(false)

    const handleListView = () => {
        setShowItems(!showItems)
    }
    if (data == null)
        return <></>
    
    console.log(data)
    const menu = data[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((category) => {return category.card.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"})
    return (
        <div className="menu-ctr mx-auto w-6/12 text-center">
            <h2 className="text-3xl font-extrabold">{data[2]?.card?.card.info.name}</h2>
            {menu && menu.map((categ, idx) =>(                        
                <div key={idx}>
                    <div className="border-solid border-2 shadow-lg my-4 p-3 flex justify-between">
                        <span className="font-medium text-lg">{categ?.card?.card?.title + "(" + categ?.card?.card?.itemCards.length + ")"}</span> <span className="text-xl font-semibold mt-2" onclick={handleListView}> <IoMdArrowDropdown /> </span>
                    </div>
                    {categ?.card?.card?.itemCards?.map((menuItem) => (
                            showItems ? <ItemsList key={menuItem.card.info.id} prop={menuItem?.card}/>  : <></>
                        ))
                    }
                </div>
            ))}
        </div>
    );
}