import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selCategory: ""
};

export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers: {
        updateCategory: (state, action: PayloadAction<string>) => {
            state.selCategory = action.payload
        }
    }
});

export const { updateCategory } = productReducer.actions;


