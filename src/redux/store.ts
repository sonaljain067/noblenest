import { configureStore } from "@reduxjs/toolkit";
import { CategoryAPI } from "./api/categoryAPI";
import { DashboardAPI } from "./api/dashboardAPI";
import { OrderAPI } from "./api/orderAPI";
import { ProductAPI } from "./api/productAPI";
import { userAPI } from "./api/userAPI";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
import { productReducer } from "./reducer/productReducer";

export const server = import.meta.env.VITE_SERVER; 

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer, 
        [productReducer.name]: productReducer.reducer, 

        [userAPI.reducerPath]: userAPI.reducer, 
        [ProductAPI.reducerPath]: ProductAPI.reducer, 
        [CategoryAPI.reducerPath]: CategoryAPI.reducer,
        [OrderAPI.reducerPath]: OrderAPI.reducer, 
        [DashboardAPI.reducerPath]: DashboardAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                .concat(userAPI.middleware)
                .concat(ProductAPI.middleware)
                .concat(CategoryAPI.middleware)
                .concat(OrderAPI.middleware)
                .concat(DashboardAPI.middleware)
}); 

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 