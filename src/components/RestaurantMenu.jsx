import { useParams} from 'react-router-dom'
import useRestaurantMenu from '../utils/useRestaurantMenu'

export default RestaurantMenu = () => {
    const param = useParams()

    const data = useRestaurantMenu(param.resid)  //custom hook

    if (data == null)
        return <></>
    const menu = data[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    return (
        <div className="res-menu">
            <h2>{data[2]?.card?.card.info.name}</h2>
            <div className="food-menu">
                {menu ? menu.map((categ, idx) => {
                    const categories = categ?.card?.card;
                    
                    return (
                        categories && categories.title ? (
                            <div key={idx}> {/* Use key prop here instead of id */}
                                <h4>{categories.title}</h4>
                                <ul>
                                    {categories?.carousel 
                                        ? categories.carousel.map((menuItem) => (
                                            <li key={menuItem.title}> {/* Ensure this is unique */}
                                                &emsp;{menuItem.title}
                                            </li>
                                        )) 
                                        : categories?.itemCards?.map((menuItem) => (
                                            <li key={menuItem.card.info.id}> {/* Use a unique key */}
                                                &emsp;{menuItem.card.info.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : null
                    );
                }) : null}
            </div>
        </div>
    );
}