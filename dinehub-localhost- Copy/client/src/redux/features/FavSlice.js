import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fav: []
}

// card slice
const FavSlice = createSlice({
    name: "FavSlice",
    initialState,
    reducers: {

        // add to cart
        addToFav: (state, action) => {
            
            const IteamIndex = state.fav.findIndex((e) => e.id === action.payload.id);

            if (IteamIndex >= 0) {
                state.fav[IteamIndex].qnty += 1
            } else {
                const temp = { ...action.payload, qnty: 1 }
                state.fav = [...state.fav, temp]

            }
            
        },

        // remove perticular iteams
        removeToFav:(state,action)=>{
            const data = state.fav.filter((ele)=>ele.id !== action.payload);
            state.fav = data
        },
        
    }
});

export const { addToFav,removeToFav} = FavSlice.actions;

export default FavSlice.reducer;




