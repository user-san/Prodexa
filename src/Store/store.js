import { configureStore } from "@reduxjs/toolkit";
import cartSliceReaducer from "./cartSlice";
const store = configureStore({
    reducer: {
        Cart: cartSliceReaducer
    }
});

export default store;


//? data flow
//! Component                Redux Toolkit
//! ----------               ---------------------------
//! useDispatch() ─────▶   dispatch(action)  ──▶ reducer (from createSlice)
//!    ▲                                                  │
//!    │                                                  ▼
//! useSelector()  ◀─────   store.state   ◀──   configureStore()






