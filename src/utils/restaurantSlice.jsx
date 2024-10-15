import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: {
        restaurantsList: [],
        filteredRestaurantsList: [],
        activeFilters: {
            fastDelivery: false,
            new: false,
            rating4Plus: false,
            pureVeg: false,
            offers: false,
            priceRange300To600: false,
            priceRangelessThan300: false,
        },
    },
    reducers: {
        // Replace the entire restaurantsList with action.payload (an array)
        addRestaurants: (state, action) => {
            state.restaurantsList = action.payload;  // Directly assign the payload
        },
        // Replace the entire filteredRestaurantsList with action.payload (an array)
        addFilteredRestaurants: (state, action) => {
            state.filteredRestaurantsList = action.payload;  // Directly assign the payload
        },
        toggleFilter: (state, action) => {
            const filterName = action.payload;
            state.activeFilters[filterName] = !state.activeFilters[filterName];
            state.filteredRestaurantsList = applyFilters(state.restaurantsList, state.activeFilters);
        }
    },
});

const applyFilters = (res, filters) => {
    return res[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.filter((restaurant) => {
        if (filters.fastDelivery && restaurant?.info?.sla?.deliveryTime > 20 ) return false;
        if (filters.new && !restaurant?.info?.avgRating != "--") return false;
        if (filters.rating4Plus && restaurant?.info?.avgRating < 4) return false;
        if (filters.pureVeg && !restaurant?.info?.veg) return false;
        if (filters.offers && restaurant?.info?.aggregatedDiscountInfoV3 == null) return false;

        if (filters.priceRangelessThan300 && parseInt(restaurant?.info?.costForTwo.match(/\d+/)[0]) >= 300) return false;
        if (filters.priceRange300To600 && (parseInt(restaurant?.info?.costForTwo.match(/\d+/)[0]) < 300 || parseInt(restaurant?.info?.costForTwo.match(/\d+/)[0]) > 600)) return false;

        return true; // Include the restaurant if it passes all filters
    });
};

export const { addRestaurants, addFilteredRestaurants, toggleFilter} = restaurantSlice.actions;

export default restaurantSlice.reducer;
