import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState: {
        restaurantsList:[],
        filteredRestaurantsList: []
    },
    reducers: {
        addRestaurants: (state, action) => state.restaurantsList.push(action.payload),
        addFilteredRestaurants: (state, action) => state.filteredRestaurantsList.push(action.payload),
    }
})


export const {addRestaurants, addFilteredRestaurants} = restaurantSlice.actions;

export default restaurantSlice.reducer;
