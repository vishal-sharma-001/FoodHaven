export default ItemsList = ({prop}) => {
    console.log(prop)
    return (
        <>
            <div className="flex justify-between p-3">
                <div className="text-left p-1 max-w-xl">
                    <p className="font-medium">{prop?.info?.name }</p>
                    <p className="font-medium">{prop?.info?.price ? prop?.info?.price/100 : prop?.info?.defaultPrice/100}</p>
                    <p className="text-zinc-600 mt-10">{prop?.info?.description}</p>
                </div>
                <div>
                    <img className= "rounded-md w-[150px] h-[150px]"src={"https://media-assets.swiggy.com/swiggy/image/upload/" + prop.info.imageId}/>
                    <button className="bg-white text-green-900 rounded-xl border-2 w-24 h-10 relative bottom-6">ADD</button>
                    <p className="font-light text-xs relative bottom-5 text-gray-500">Customiseable</p>
                </div>
            </div>
            <hr/>
        </>

    )
}