import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIResponse, AddressAPIResponse, UserAPIResponse, UsersAPIResponse } from "../../types/api.types";
import { Address, User } from "../../types/base.types";
import axios from "axios";

const server = import.meta.env.VITE_SERVER; 

export const userAPI = createApi({
    reducerPath: "userAPI", 
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${server}/user` 
    }), 
    tagTypes: ["users"], 
    endpoints: (builder) => ({
        login: builder.mutation<APIResponse, User>({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["users"]
        }),
        deleteUser: builder.mutation<APIResponse, {userId: string, adminUserId: string}>({
            query: ({userId, adminUserId}) => ({
                url: `/${userId}?id=${adminUserId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["users"]
        }),
        createAddress: builder.mutation<AddressAPIResponse, {address: Omit<Address, "_id">, id: string}>({
            query: ({address, id}) => ({
                url: `/address?id=${id}`,
                method: "POST",
                body: address
            }),
            invalidatesTags: ["users"], 
        }),
        allUsers: builder.query<UsersAPIResponse, string>({
            query: (id) => `?id=${id}`,
            providesTags: ["users"]
        }),
        fetchUserAddresses: builder.query<UsersAPIResponse, string>({
            query: (id) => `/address?id=${id}`,
            providesTags: ["users"]
        }),
    })
});


export const getUserById = async(id: string) => {
    try{
        const { data } : { data: UserAPIResponse} = await axios.get(`${server}/user/${id}`)
        return data; 
    } catch(error) {
        throw error; 
    }
}

export const { useLoginMutation, useCreateAddressMutation, useDeleteUserMutation, useAllUsersQuery, useFetchUserAddressesQuery } = userAPI