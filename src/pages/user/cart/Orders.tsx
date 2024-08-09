import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { SkeletonLoader } from "../../../components/Loader";
import TableHOC from "../../../components/admin/TableHOC";
import { useAllOrdersQuery } from "../../../redux/api/orderAPI";
import { RootState } from "../../../redux/store";
import { ErrorAPIResponse } from "../../../types/api.types";
import { Order, Product } from "../../../types/base.types";
import { TransactionDataType } from "../../../types/dash.types";

const columns: Column<TransactionDataType> [] = [ 
  {
    Header: "Product", 
    accessor: "product"
  },
  {
    Header: "Amount", 
    accessor: "total"
  }, 
  {
    Header: "Discount", 
    accessor: "discount"
  },
  {
    Header: "Quantity",
    accessor: "quantity"
  },
  {
    Header: "Status",
    accessor: "status"
  }
]

const transformData = (fetchedData: Order[]) => {
    const result: any = [];
    fetchedData.forEach((i: any) => {
      const additionalDetails: {[key: string]: any} = {};
      for (const [key, value] of Object.entries(i)) {
        if(key === "user") {
          additionalDetails[key] = (value as UserRes).firstName
        } else if(key === "status") {
          additionalDetails[key] = value;
        }
        else if (key !== 'orderItems' && typeof value !== 'string') {
          additionalDetails[key] = value;
        } 
      }
  
      if (Array.isArray(i['orderItems'])) {
        i['orderItems'].forEach((item: any) => {
          const finalItem: any = {
            quantity: item.quantity,
            product: item.product,
            cartId: item._id, 
            ...additionalDetails,
          };
          result.push(finalItem);
        });
      }
    });
    return result; 
}

interface UserRes {
    _id: string;
    firstName: string; 
}
interface DataType {
    _id: string; 
    user: {
      firstName: string; 
    }
    subTotal: number; 
    tax: number; 
    discount: number;
    total: number; 
    quantity: number; 
    product: Product;
    cartId: string; 
    status: string; 
}
const Orders = () => {
    const { user } = useSelector((state: RootState) => (state.userReducer))
    const { data: transactionsData, isLoading, isError, error } = useAllOrdersQuery(user?._id!);
    if(isError) {
      const err = (error as ErrorAPIResponse)?.data.message
      if(err) toast.error(err);  
      else {
          console.log(error)
          toast.error("Internal Server Error!!")
      }
    }
    
    const [ rows, setRows ] = useState<TransactionDataType[]> ([]); 
    useEffect(() => {
      if(transactionsData) {
        const res = transformData(transactionsData?.data!)
        setRows(res.map((i: DataType) => ({
          id: i._id, 
          quantity: i.quantity, 
          discount: `$`+i.discount, 
          product: <Link to={`/product/${i.product._id}`}>{i.product.name}</Link>,  
          total: `$`+i.total, 
          status: <span className={i.status == "Processing" ? "red": i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>
      })))}
    }, [transactionsData]);
    
    const Table = TableHOC<TransactionDataType> (columns, rows, "dashboardOrderBox", "Orders", rows.length > 4)(); 

  return (
    <div className="orderContainer">
        <h1>My Orders</h1>
         {isLoading ? <SkeletonLoader length={20}/> : Table}
    </div>
  )
}

export default Orders