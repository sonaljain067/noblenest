import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { APIResponse, ErrorAPIResponse } from "../types/api.types";

type ResponseType = {
        data: APIResponse;
        error?: undefined;
    } | {
        data?: undefined;
        error: FetchBaseQueryError | SerializedError;
}

export const responseToast = (res: ResponseType, navigate: NavigateFunction|null, url: string) => {
    if("data" in res) {
        toast.success(res.data?.message as string); 
        if(navigate) navigate(url); 
    } else {
        const err = (res.error as ErrorAPIResponse)?.data.message
        if(err) toast.error(err);  
        else {
            console.log(res.error)
            toast.error("Internal Server Error!!")
        }
    }
}

export const getLastSixTwelveMonths = () => {
    const currentDate = moment()
    currentDate.date(1); 

    const lastSixMonths: string[] = []; 
    const lastTwelveMonths: string[] = []; 

    for(let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, "months"); 
        const monthName = monthDate.format("MMM"); 
        lastSixMonths.unshift(monthName)
    }
    for(let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, "months"); 
        const monthName = monthDate.format("MMM"); 
        lastTwelveMonths.unshift(monthName)
    }
    return {
        lastSixMonths, 
        lastTwelveMonths
    }
}