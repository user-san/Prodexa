import { createSlice } from "@reduxjs/toolkit";
const datafromWeb=JSON.parse(localStorage.getItem("Cart"));
const cartSlice = createSlice({
    name: "cart",
    initialState:datafromWeb,
    reducers: {
        addItem(state, action) {
            state.push(action.payload);
            localStorage.setItem("Cart",JSON.stringify([...state]));
            alert("✅product Added Successfully!");
        },
        deleteItem(state, action) {
            let updatedCartProducts = state.filter((product) => product.id !== action.payload);
            localStorage.setItem("Cart",JSON.stringify([...updatedCartProducts]));
            return updatedCartProducts;
        }
    }
});

// console.log(cartSlice);


export default cartSlice.reducer;

export let { addItem, deleteItem } = cartSlice.actions;