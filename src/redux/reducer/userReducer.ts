import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer.types";
import { RootState } from "../store";
import { User } from "../../types/base.types";
// import { getUserById } from "../api/userAPI";
import axios from "axios";

const initialState: UserReducerInitialState = {
    user: {
        _id: "",
        firstName: "",
        username: "",
        avatar: "",
        role: "",
        email: "",
        phone: ""
    },
    loading: true, 
    error: null
};
const server = import.meta.env.VITE_SERVER; 

export const getUserById = createAsyncThunk(
    'user/getUserById', 
    async(id) => {
        try{
            const data = await axios.get(`${server}/user/${id}`);
            return data; 
        } catch(error){
            throw error; 
        }
    }
)

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (
            state,
            action: PayloadAction<User>
        ) => {
            state.loading = false;
            state.user = action.payload;
        },
        userNotExist: (state) => {
            state.loading = false;
            state.user = {
                _id: "",
                firstName: "",
                username: "",
                avatar: "",
                role: "",
                email: "",
                phone: ""
            };
        }
    }
});

export const { userExist, userNotExist } = userReducer.actions;

export const selectCurrentUser = (state: RootState) => state.userReducer.user;


