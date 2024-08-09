import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryAPIResponse, SubCategoryAPIResponse } from "../../types/api.types";

const server = import.meta.env.VITE_SERVER; 

export const CategoryAPI = createApi({
    reducerPath: "categoryAPI", 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/category`
    }), 
    endpoints: (builder) => ({
        categories: builder.query<CategoryAPIResponse, string>({ 
            query: () => "/"
        }),
        subCategories: builder.query<SubCategoryAPIResponse, string>({
            query: () => "/sub"
        }),
        catSubCategories: builder.query<SubCategoryAPIResponse, string>({
            query: (id) => `/cat/sub/${id}`
        }),
    })
}) 

export const { useCategoriesQuery, useSubCategoriesQuery, useCatSubCategoriesQuery } = CategoryAPI;
