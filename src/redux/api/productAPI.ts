import { CreateProductRequest, DeleteProductRequest, LatestProductsAPIResponse,ProductAPIResponse,SearchProductRequest, SearchProductsAPIResponse, UpdateProductRequest } from "../../types/api.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const server = import.meta.env.VITE_SERVER; 

export const ProductAPI = createApi({
    reducerPath: "productAPI", 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/product`
    }), 
    tagTypes: ["product"], 
    endpoints: (builder) => ({
        latestProducts: builder.query<LatestProductsAPIResponse, string>({ 
            query: () => `/latest`,
            providesTags: ["product"]
        }),
        fetchProducts: builder.query<SearchProductsAPIResponse, string>({ 
            query: () => ``,
            providesTags: ["product"]
        }),
        allProducts: builder.query<SearchProductsAPIResponse, string>({ 
            query: (id) => `/?id=${id}`,
            providesTags: ["product"]
        }),
        searchProducts: builder.query<SearchProductsAPIResponse, SearchProductRequest>({ 
            query: ({price, search, sort, category, page, subCategory}) => {
                let base = `?search=${search}&page=${page}`;
                if(sort) base+=`&sort=${sort}`
                if(category)  base += `&category=${category}`
                if(subCategory)  base += `&subCategory=${subCategory}`
                if(price)  base+=`&price=${price}`
                return base
            },
            providesTags: ["product"]
        }),
        productDetails:  builder.query<ProductAPIResponse, string>({ 
            query: (id) => `/${id}`,
            providesTags: ["product"]
        }),
        createProduct: builder.mutation<ProductAPIResponse, CreateProductRequest>({ 
            query: ({formData, id}) => ({
                url: `/?id=${id}`,
                method: 'POST', 
                body: formData
            }),
            invalidatesTags: ["product"]
        }),
        updateProduct: builder.mutation<ProductAPIResponse, UpdateProductRequest>({ 
            query: ({formData, userId, productId}) => ({
                url: `/${productId}?id=${userId}`,
                method: 'PATCH', 
                body: formData
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<ProductAPIResponse, DeleteProductRequest>({ 
            query: ({userId, productId}) => ({
                url: `/${productId}?id=${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["product"]
        }),
    })
})

export const { 
    useLatestProductsQuery, useFetchProductsQuery, useAllProductsQuery, useSearchProductsQuery, useCreateProductMutation,
    useProductDetailsQuery, 
    useUpdateProductMutation, useDeleteProductMutation
} = ProductAPI;
