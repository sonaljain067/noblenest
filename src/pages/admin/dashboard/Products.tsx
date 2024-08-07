import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Column } from "react-table";
import { SkeletonLoader } from "../../../components/Loader";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import TableHOC from "../../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { ErrorAPIResponse } from "../../../types/api.types";
import { ProductDataType } from "../../../types/dash.types";

const columns: Column<ProductDataType>[] = [  
  {
    Header: "Photo", 
    accessor: "coverImage"
  },
  {
    Header: "Name", 
    accessor: "name"
  },
  {
    Header: "Price", 
    accessor: "price"
  },
  {
    Header: "Stock", 
    accessor: "stock"
  },
  {
    Header: "Action", 
    accessor: "action"
  },
  {
    Header: "Artisan", 
    accessor: "artisan"
  }
]

const Products = () => {
  const { user } = useSelector((state: RootState) => (state.userReducer))
  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);
  const [ rows, setRows ] = useState<ProductDataType[]>([]);

  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message;
    toast.error(err); 
    return <Navigate to={"/404"} />
  }

  useEffect(() => {
    if(data) {
      setRows(data?.data.products.map((i) => ({
        _id: i._id,
        name: i.name, 
        price: i.price,
        stock: i.stock, 
        artisan: i.artisan, 
        coverImage: <img src={i.coverImage} />, 
        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>
      })));
    }
  }, [data]);
  

  const Table = TableHOC<ProductDataType>(columns, rows, "dashboardProductBox", "Products", true)(); 

  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main>
          {isLoading ? 
            <SkeletonLoader length={20}/> : Table
          }
          <Link to="/admin/product/new" className="createProductBtn">
            {<FaPlus />}
          </Link>
      </main>
    </div>
  )
}

export default Products

