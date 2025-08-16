import { configureStore } from "@reduxjs/toolkit";
import cartSliceReaducer from "./cartSlice";
const store = configureStore({
    reducer: {
        Cart: cartSliceReaducer
    }
});

export default store;