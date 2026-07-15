import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const cartSlice = createSlice ({
    name:"cart",
    initialState,
    reducers: {
        addToCart : (state, action) =>{
            const item =action.payload;
            const existing = state.items.find((i)=>i.id == item.id);

            if(existing) {
                existing.quantity +=1;
            }
            else {
                state.items.push({...item, quantity:1});
            }
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);
        },
       incrementQty: (state, action) =>{
        const item = state.items.find((item)=>item.id == action.payload);
        if(item) {
            item.quantity +=1;

        }
       },
       decrementQty : (state, action) =>{
        const item = state.items.find((item)=>item.id == action.payload);
        if(item && item.quantity > 1) {
            item.quantity -=1;
        }
        else {
            state.items = state.items.filter((item)=>item.id !== action.payload);
        }
       },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
} =cartSlice.actions;


export default cartSlice.reducer;