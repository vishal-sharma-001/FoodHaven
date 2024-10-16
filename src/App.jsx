import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body'
import '../index.css'
import { useEffect, useState, lazy, Suspense} from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import About from './components/About';
import Help from './components/Help';
import ErrorPage from './components/ErrorPage';
import RestaurantMenu from './components/RestaurantMenu'
import ResContext from './utils/ResContext';
import Cart from './components/Cart';
import store from './utils/store';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addRestaurants, addFilteredRestaurants } from './utils/restaurantSlice';
const Groceries = lazy(()=> import ("./components/Groceries")) 

const App = () =>{
    const dispatch = useDispatch()
    useEffect(() => {
        fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
            .then((res) => {
                if (res.ok)
                    return res.json()
                else
                    throw new Error("Network response was not ok " + res.statusText);
            })
            .then((res) => {
                dispatch(addRestaurants(res?.data?.cards))
                dispatch(addFilteredRestaurants(res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants))
            })
            .catch((err) => {
                console.log("Fetching data failed. " + err)
            })
    }, [])
    
    return(
        <div className="min-w-[1800px] min-h-[1000px] overflow-hidden pt-[80px]">
            <Header />
            {/* TO HAVE HEADER ALWAYS ON TOP REGARDLESS OF THE PAGE WE CAN CONDITIONALLY RENDER THE CHILD COMPONENTS */}
                <Outlet />
        </div>
   )
}
const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Body/>,                
            },
            {
                path: '/about',
                element: <About/>,
            }, 
            {
                path: '/help',
                element: <Help/>,
            },
            {
                path: '/menu/:resid',
                element: <RestaurantMenu/>,
            },
            {
                path: '/groceries',
                element: <Suspense fallback={<div></div>}> <Groceries/> </Suspense>,                
            },
            {
                path: '/cart',
                element: <Cart/>
            }
        ]
    }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <RouterProvider router={appRouter}/>
    </Provider>    
)