import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import TableHOC from "../../../components/admin/TableHOC";
import { useAllUsersQuery, useDeleteUserMutation } from "../../../redux/api/userAPI";
import { RootState } from "../../../redux/store";
import { ErrorAPIResponse } from "../../../types/api.types";
import { CustomerDataType } from "../../../types/dash.types";

const columns: Column<CustomerDataType> [] = [
  {
    Header: "Avatar",
    accessor: "avatar"
  }, 
  {
    Header: "Name", 
    accessor: "name"
  }, 
  {
    Header: "Gender", 
    accessor: "gender"
  },
  {
    Header: "Email",
    accessor: "email"
  },
  {
    Header: "Role",
    accessor: "role"
  }, 
  {
    Header: "Action",
    accessor: "action"
  }
]

const Customers = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isError, error, isLoading } = useAllUsersQuery(user?._id); 
  
  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
  }

  const [rows, setRows ] = useState<CustomerDataType[]>([]); 
  const [deleteUser] = useDeleteUserMutation(); 
  const deleteHandler = async(userId: string) => {
    const res = await deleteUser({userId, adminUserId: user?._id})
    toast.success(res.data?.message as string)
  }
  useEffect(() => {
    if(data?.data) {
      setRows(data?.data.map(i => ({
        _id: i._id,
        name: i.firstName + " " + i.lastName, 
        avatar: <img style={{borderRadius: "50%"}} src={i.avatar} alt={i.firstName}/>, 
        gender: i.gender!, 
        email: i.email, 
        role: i.role, 
        action: <button onClick={() => deleteHandler(i._id)}><FaTrash/></button>
      })))
    }
    
  }, [data]); 

  const Table = TableHOC<CustomerDataType>(columns, rows, "dashboardCustomerBox", "Customers", true)(); 

  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main>
      <main>
        {isLoading ? <SkeletonLoader /> : Table}
      </main>
      </main>
    </div>
  )
}

export default Customers