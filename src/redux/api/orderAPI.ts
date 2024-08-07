import { APIResponse, OrderAPIResponse, OrdersAPIResponse, UserOrderAPIRequest } from "../../types/api.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateOrderRequest } from "../../types/api.types";

const server = import.meta.env.VITE_SERVER; 

export const OrderAPI = createApi({
    reducerPath: "orderAPI", 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/checkout`
    }), 
    tagTypes: ["order"], 
    endpoints: (builder) => ({
        createOrder: builder.mutation<OrderAPIResponse, {order: CreateOrderRequest, id: string}>({ 
            query: ({order, id}) => ({
                url: `?id=${id}`,
                method: 'POST', 
                body: order
            }),
            invalidatesTags: ["order"]
        }),
        updateOrder: builder.mutation<APIResponse, UserOrderAPIRequest>({ 
            query: ({orderId, userId}) => ({
                url: `/${orderId}?id=${userId}`,
                method: 'PATCH'
            }),
            invalidatesTags: ["order"]
        }),
        deleteOrder: builder.mutation<APIResponse,  UserOrderAPIRequest>({ 
            query: ({orderId, userId}) => ({
                url: `/${orderId}?id=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["order"]
        }),
        userOrders: builder.query<OrdersAPIResponse, string>({ 
            query: (id) => ({
                url: `?id=${id}`,
                method: 'GET', 
            }),
            providesTags: ["order"]
        }),
        allOrders: builder.query<OrdersAPIResponse, string>({ 
            query: (id) => ({
                url: `all?id=${id}`,
                method: 'GET', 
            }),
            providesTags: ["order"]
        }),
        orderDetails: builder.query<OrderAPIResponse, UserOrderAPIRequest>({ 
            query: ({userId, orderId}) => ({
                url: `/${orderId}?id=${userId}`,
                method: 'GET', 
            }),
            providesTags: ["order"]
        })
    })
})

export const { useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useUserOrdersQuery, useAllOrdersQuery, useOrderDetailsQuery } = OrderAPI;
