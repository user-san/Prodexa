import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addItem(state, action) {
            state.push(action.payload)
        },
        deleteItem(state, action) {
            let updatedCartProducts = state.filter((product) => product.id !== action.payload);
            return updatedCartProducts;
        }
    }
});

// console.log(cartSlice);


export default cartSlice.reducer;

export let { addItem, deleteItem } = cartSlice.actions;




//?under the hood                                            
//!dispatch(addItem(product))                                
//!       ↓                                                  
//! cartSlice.actions.addItem(product)                       
//!        ↓                                                 
//! {                                                        
//!   type: "cart/addItem",                                  
//!   payload: product                                       
//! }                                                        
//!        ↓                                                 
//! Redux Store calls cartSlice.reducer(state, action)       
//!        ↓                                                 
//! cartSlice.caseReducers.addItem(state, action)            
//!        ↓                                                 
//! state.push(action.payload) — (Immer handles immutability)
//!        ↓                                                 
//! Reduxstore updates state                                 
//!        ↓                                                 
//! useSelector() reads new state                            
//!        ↓                                                 
//! Component re-renders                                     

                            //?{                                                                
                            //?   name: 'cart',                                                 
                            //?   reducer: function reducer(state, action) {                    
                            //?     // routes to correct caseReducer like addItem/deleteItem  -----> SEE IT IN BELOW
                            //?   },                                                            
                            //?   actions: {                                                    
                            //?     addItem: () => ({ type: 'cart/addItem', payload }),         
                            //?     deleteItem: () => ({ type: 'cart/deleteItem', payload })    
                            //?   },                                                            
                            //?   caseReducers: {                                               
                            //?     addItem(state, action) {...},---> our own Logics written inside the reducers key 
                            //?     deleteItem(state, action) {...}                             
                            //?   }                                                             
                            //?                                                                 
                            //?  }                                                              



//? reducer function in createSlice()                   
//! function reducer(state, action) {                   
//!   switch(action.type) {                             
//!     case "cart/addItem":                            
//!       return caseReducers.addItem(state, action)    
//!     case "cart/deleteItem":                         
//!       return caseReducers.deleteItem(state, action) 
//!     default:                                        
//!       return state                                  
//!   }                                                 
//! }                                                   