import { ReactElement } from "react";
import { IconType } from "react-icons";
import { Location } from "react-router-dom";
import { OrderItem, Product, User } from "./base.types";

// Admin Dashboard 
export interface DashboardTransactionType {
    _id: string;
    quantity: number; 
    discount: number; 
    amount: number;
    status: string;
};

export interface WidgetComponentProps{
    heading: string, 
    value: string,   
    percent: number, 
    color: string, 
    amount?: boolean
}
export interface CategoryItemProps{ 
    heading: string; 
    value: number; 
    color: string;  
}

// Products 
export type ProductDataType = Omit<Product, "coverImage"> & {
    coverImage: ReactElement; 
    action: ReactElement;
};

// Customer 
export type CustomerDataType = Omit<User, "avatar"|"firstName"|"lastName"> &{
    avatar: ReactElement;  
    action: ReactElement;
    name: string; 
}

// Chart 
export interface BarChartProps { 
    horizontal?: boolean, 
    data: number[], 
    data1: number[], 
    title: string, 
    title1: string, 
    bgColor: string, 
    bgColor1: string, 
    labels?: string[]
}
export interface DoughnutChartProps{
    labels: string[], 
    data: number[],
    bgColor: string[],
    cutOut?: number | string, 
    legends?: boolean, 
    offset?: number[]
}
export interface PieChartProps{
    labels: string[], 
    data: number[],
    bgColor: string[],
    offset?: number[]
}
export interface LineChartProps { 
    data: number[], 
    label: string, 
    bgColor: string, 
    borderColor: string, 
    labels?: string[]
}

// Transaction 
export interface TransactionDataType { 
    _id: string; 
    quantity?: number; 
    discount: number; 
    product?: string; 
    user: ReactElement; 
    total: string; 
    status: ReactElement;
    action: ReactElement; 
}


// Navbar
export interface LiProps { 
    url: string, 
    text: string, 
    location: Location;
    Icon?: IconType; 
}

// Dashboard
export interface DashboardProductCategory{
    _id: string; 
    heading: string; 
}

export interface ProductProps extends Product {
    rating: number; 
    isOnSale?: boolean; 
    isWishlisted?: boolean; 
    isAddedOnCart?: boolean; 
    handler: (orderItem: OrderItem) => string|undefined; 
}

// Shop
export interface SliderProps {
    value: number; 
    min: number; 
    max: number; 
    onChange: Function; 
}

// Cart
export type CartItemComponentProps = {
    cartItem: OrderItem; 
    incrementHandler: (cartItem: OrderItem) => void; 
    decrementHandler: (cartItem: OrderItem) => void;  
    removeHandler: (id: string) => void; 
}