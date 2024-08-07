import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer.types";
import { Address, OrderItem } from "../../types/base.types";

const initialState: CartReducerInitialState = {
    loading: true,
    user: "", 
    cartItems: [],
    address: {
        _id: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        deliveryInstructions: ""
    },
    subTotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    status: "Processing"
};

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{order: OrderItem, flag: boolean, dir?: boolean}>) => {
            state.loading = true 
            const index = state.cartItems.findIndex(i => i.product._id === action.payload.order.product._id);

            if(index == -1) {
                state.cartItems.push(action.payload.order)
            } else {
                if(action.payload.flag) {
                    state.cartItems[index].quantity += 1;  
                } else if(action.payload.dir) {
                    state.cartItems[index].quantity += action.payload.order.quantity; 
                } else {
                    state.cartItems[index] = action.payload.order; 
                }
            }
            state.loading = false; 
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true; 
            state.cartItems = state.cartItems.filter(i => i.product._id !== action.payload);
            state.loading = false;
        },
        calculatePrice: (state) => {
            state.subTotal = state.cartItems.reduce((total, item) => total + (item.quantity * item.product.price), 0); 
            state.shippingCharges = state.subTotal > 1000 ? 0 : 200; 
            state.tax = Math.round(state.subTotal * 0.18);
            state.total = state.shippingCharges + state.subTotal + state.tax - state.discount; 
        },
        applyDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload
        },
        saveShippingInfo: (state, action: PayloadAction<Address>) => {
            state.address = action.payload
        },
        clearShippingInfo: (state) => {
            state.address = {
                _id: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                country: "",
                deliveryInstructions: ""
            }; 
        },
        resetCart: () => initialState, 
    }
});

export const { addToCart, removeCartItem, calculatePrice, applyDiscount, saveShippingInfo, resetCart, clearShippingInfo } = cartReducer.actions;


