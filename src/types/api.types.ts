import { Address, BarChart, Category, LineChart, Order, PieChart, Product, ProductDetail, Stats, SubCategory, User } from "./base.types";

export interface APIResponse {
    statusCode: number;
    data: object;
    message: string;
    success: boolean;
}
export interface ErrorAPIResponse {
    data: {
        statusCode: number;
        message: string;
    } 
}

// User 
export interface UserAPIResponse extends APIResponse {
    data: User;
}
export interface UsersAPIResponse extends APIResponse {
    data: User[];
}

export interface AddressAPIResponse extends APIResponse {
    data: Address; 
}

// Product 
export interface CreateProductRequest{ 
    id: string; 
    formData: FormData;  
}
export interface SearchProductRequest{
    search?: string;
    price?: number; 
    page?: number;
    category?: string; 
    sort?: string; 
    subCategory?: string; 
}
export interface UpdateProductRequest{ 
    userId: string; 
    productId: string; 
    formData: FormData;  
}
export interface DeleteProductRequest{ 
    userId: string; 
    productId: string; 
}
export interface ProductAPIDetailResponse extends APIResponse {
    data: {

    }
}
export interface ProductAPIResponse extends APIResponse {
    data: ProductDetail; 
}
export interface LatestProductsAPIResponse extends APIResponse {
    data: Product[]; 
}
export interface SearchProductsAPIResponse extends APIResponse {
    data: {
        products: Product[];
        totalPages: number; 
    }
}

// Category 
export interface CategoryAPIResponse extends APIResponse {
    data: Category[]; 
}
export interface SubCategoryAPIResponse extends APIResponse {
    data: SubCategory[]; 
}

export type OrderItemRequest = {
    quantity: number;
    product: {
        _id: string; 
    }
}
export type CreateOrderRequest = {
    tax: number; 
    shippingCharges: number; 
    discount: number; 
    rzpOrderId: string; 
    rzpPaymentId: string; 
    orderItems: OrderItemRequest[],
    address: string; 
    rzpSignature: string; 
    status: string;
}

export interface UserOrderAPIRequest {
    userId: string;
    orderId: string; 
}

export interface OrderAPIResponse extends APIResponse{
    data: Order; 
}
export interface OrdersAPIResponse extends APIResponse{
    data: Order[]; 
}

// Checkout
export type CheckoutOrderRequest = {
    amount: number; 
    orderId: string; 
}

export interface CheckoutOrderResponse extends APIResponse{
    data: {
        order: string; 
        rzpOrder: string; 
        status: string; 
        _id: string; 
    }
}


// Dashboard
export interface StatsAPIResponse extends Response{
    data: Stats;
}
export interface PieAPIResponse extends Response{
    data: PieChart; 
}
export interface BarAPIResponse extends Response{
    data: BarChart; 
}
export interface LineAPIResponse extends Response{
    data: LineChart; 
}
