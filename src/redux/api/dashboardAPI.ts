import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BarAPIResponse, LineAPIResponse, PieAPIResponse, StatsAPIResponse } from "../../types/api.types";

const server = import.meta.env.VITE_SERVER; 

export const DashboardAPI = createApi({
    reducerPath: "dashboardAPI", 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/dashboard`
    }), 
    endpoints: (builder) => ({
        stats: builder.query<StatsAPIResponse, string>({ 
            query: (id) => ({
                url: `?id=${id}`,
                method: 'GET', 
            }),
            keepUnusedDataFor: 0
        }), 
        pieStats: builder.query<PieAPIResponse, string>({ 
            query: (id) => ({
                url: `/pie?id=${id}`,
                method: 'GET', 
            }),
            keepUnusedDataFor: 0
        }), 
        barStats: builder.query<BarAPIResponse, string>({ 
            query: (id) => ({
                url: `/bar?id=${id}`,
                method: 'GET', 
            }),
            keepUnusedDataFor: 0
        }), 
        lineStats: builder.query<LineAPIResponse, string>({ 
            query: (id) => ({
                url: `/line?id=${id}`,
                method: 'GET', 
            }),
            keepUnusedDataFor: 0
        }), 
    })
})

export const { useStatsQuery, usePieStatsQuery, useBarStatsQuery, useLineStatsQuery } = DashboardAPI
