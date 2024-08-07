import { Order, OrderItem, User } from "./base.types";

// User
export interface UserReducerInitialState{
    user: User; 
    loading: boolean; 
    error?: null; 
}

// Cart 
export type CartReducerInitialState = Omit<Order, "_id"|"orderItems"|"user"|"rzpOrderId"|"rzpPaymentId"|"rzpSignature"> & {
    loading: boolean; 
    user: string; 
    cartItems: OrderItem[];
}

