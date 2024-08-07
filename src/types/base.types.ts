export interface User {
    _id: string;  
    firstName: string;
    avatar: string; 
    role: string; 
    email: string;
    username?: string; 
    phone?: string;
    lastName?: string;  
    password?: string; 
    gender?: string; 
    dob?: string; 
}
export interface Product{
    _id: string; 
    name: string; 
    price: number; 
    stock: number; 
    coverImage: string; 
    description?: string; 
    images?: string[]; 
    subCategory?: string; 
    artisan?: string; 
}

export interface ProductDetail{
    _id: string; 
    name: string; 
    price: number; 
    stock: number; 
    coverImage: string; 
    description?: string; 
    images?: string[]; 
    subCategory: SubCategory; 
    artisan: Artisan; 
}

export interface SubCategory{
    _id: string; 
    name: string; 
    category: Category; 
}
export interface Category{
    _id: string; 
    name: string; 
}

export interface Artisan {
    _id: string; 
    user?: string;
    businessName: string; 
    businessAddress: string; 
    description: string; 
    logo: string; 
    about: string; 
}

export interface Address{
    _id: string; 
    address: string; 
    city: string; 
    state: string; 
    pincode: string; 
    country: string; 
    deliveryInstructions: string; 
}

export interface RatingReview{
    _id: string; 
    rating: number; 
    review: number; 
    user: string;
    product: Product; 
}

export interface Coupon{
    _id: string; 
    code: string; 
    amount: number; 
}

export interface Cart{ 
    _id: string; 
    user: {
        _id: string; 
        firstName: string; 
    }
    orderItems: OrderItem[]; 
    address: Address; 
    subTotal: number;
    tax: number; 
    shippingCharges: number; 
    discount: number; 
    total: number; 
    status: string; 
}

export type Order = Omit<Cart,"orderItems"> & {
    orderItems: OrderItem[];
    rzpOrderId: string; 
    rzpPaymentId: string; 
}

export interface Stats {
    total: CountAndPercentChange, 
    percentChange: CountAndPercentChange,
    chart: {
        order: number[],
        revenue: number[], 
    },
    categories: CategoriesCount[],
    userRatio: {
        "Female": number, 
        "Male": number
    },
    latestTransactions: latestTransactions[]
}

export interface PieChart{
    orderFullfillment: {
        "Paid": number, 
        "Shipped": number, 
        "Processing": number, 
        "Failed": number, 
        "Cancelled": number, 
    },
    categories: CategoriesCount[],
    stockCount: {
        "inStock": number,
        "outOfStock": number
    },
    amountSplit: {
        "totalAmount": number,
        "totalDiscount": number,
        "totalProductionCost": number,
        "totalBurnt": number,
        "totalMarketingCost": number,
        "netMargin": number
    },
    accessRoleSplit: {
        "user": number,
        "admin": number
    },
    usersAgeGroup: {
        "teen": number,
        "adult": number,
        "old": number
    }
}

export interface BarChart {
    users: number[], 
    products: number[], 
    orders: number[]
}
export type LineChart = Omit<BarChart, "orders"> & {
    discounts: number[], 
    revenue: number[]
};

export interface OrderItem{
    quantity: number,
    product: Product
}

type CountAndPercentChange = {
    product: number, 
    order: number, 
    user: number, 
    revenue: number
}

type latestTransactions = {
    _id: string; 
    quantity: number; 
    discount: number; 
    amount: number; 
    status: string; 
}

type CategoriesCount = {
    count: number; 
    category: string; 
}


