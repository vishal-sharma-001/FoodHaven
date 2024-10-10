import { useEffect, useState} from 'react'
import {restaurantMenuApi} from './constants'

export default useResturantMenu = ({resid}) =>{
    const [resInfo, setResInfo] = useState(null)

    useEffect(()=>{
        fetch( restaurantMenuApi + resid +"&catalog_qa=undefined&submitAction=ENTER")
        .then((resp)=>{
            if(!resp.ok)
                return new Error("Failed ot fetch data"+ resp.statusText)
            else
                return resp.json()
        })
        .then((res)=>{
            setResInfo(res.data.cards)
        })
        .catch((err)=>{
            console.log("Fetching data failed. " + err)
        })
    },[])

    return resInfo
}