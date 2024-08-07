import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import TableHOC from "../../../components/admin/TableHOC";
import { useAllOrdersQuery } from "../../../redux/api/orderAPI";
import { RootState } from "../../../redux/store";
import { ErrorAPIResponse } from "../../../types/api.types";
import { TransactionDataType } from "../../../types/dash.types";

const columns: Column<TransactionDataType> [] = [
  {
    Header: "User",
    accessor: "user"
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
    Header: "Status",
    accessor: "status"
  }, 
  {
    Header: "Action",
    accessor: "action"
  }
]

// interface UserRes {
//   _id: string;
//   firstName: string; 
// }
// interface DataType {
//   _id: string; 
//   user: string; 
//   subTotal: number; 
//   tax: number; 
//   discount: number;
//   total: number; 
//   quantity: number; 
//   // product: string; 
//   cartId: string; 
//   status: string; 
// }

// const transformData = (fetchedData: Cart[]) => {
//   const result: any = [];
//   fetchedData.forEach((i: any) => {
//     const additionalDetails: {[key: string]: any} = {};
//     for (const [key, value] of Object.entries(i)) {
//       if(key === "user") {
//         additionalDetails[key] = (value as UserRes).firstName
//       } else if(key === "status") {
//         additionalDetails[key] = value;
//       } else if(key == "_id") {
//         additionalDetails["_id"] = value;
//       }
//       else if (key !== 'orderItems' && typeof value !== 'string') {
//         additionalDetails[key] = value;
//       } 
//     }

//     if (Array.isArray(i['orderItems'])) {
//       i['orderItems'].forEach((item: any) => {
//         const finalItem: any = {
//           quantity: item.quantity,
//           product: item.product,
//           cartId: item._id, 
//           ...additionalDetails,
//         };
//         result.push(finalItem);
//       });
//     }
//   });
//   return result; 
// }
const Transactions = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data: transactionsData, isLoading, isError, error } = useAllOrdersQuery(user?._id!);
  
  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
  }
  const [ rows, setRows ] = useState<TransactionDataType[]>([]); 
  
  useEffect(() => {
    if(transactionsData?.data) {
      // const res = transformData(transactionsData?.data!)
      const dat = transactionsData?.data;
      setRows(dat.map(i => ({
        _id: i._id,
        discount: i.discount,
        user: <Link to={`/admin/customer`}>{i.user.firstName}</Link>,  // ${i.user._id}
        total:  `$`+i.total, 
        status: <span className={i.status == "Processing" ? "red": i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,
        action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
      })))
    }
  }, [transactionsData]);

  const Table = TableHOC<TransactionDataType> (columns, rows, "dashboardTransactionBox", "Transactions", true)()

  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main>
        {isLoading ? <SkeletonLoader /> : Table}
      </main>
    </div>
  )
}

export default Transactions