import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { SkeletonLoader } from '../../../components/Loader';
import AdminSideBar from '../../../components/admin/AdminSideBar';
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from '../../../redux/api/orderAPI';
import { RootState } from '../../../redux/store';
import { ErrorAPIResponse } from '../../../types/api.types';
import { Cart } from '../../../types/base.types';
import { responseToast } from '../../../utils/helper';

const defaultData: Cart = {
  _id: " ",
  user: {
    _id: '',
    firstName: ''
  },
  address: {
    _id: "", 
    city: "",
    state: "", 
    country: "", 
    pincode: "",
    address: "", 
    deliveryInstructions: ""
  }, 
  status: "",
  subTotal: 0, 
  discount: 0, 
  shippingCharges: 0, 
  tax: 0, 
  total: 0, 
  orderItems: [{
    quantity: 0,
    product: {
      _id: '',
      name: "",
      price: 0,
      coverImage: "",
      stock: 0
    }
  }]
}

const TransactionCard = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => (state.userReducer))

  const { data, isLoading, isError, error } = useOrderDetailsQuery({userId: user?._id!, orderId: params.id!})

  if(isError) {
    const err = (error as ErrorAPIResponse)?.data.message
    if(err) toast.error(err);  
    else {
        console.log(error)
        toast.error("Internal Server Error!!")
    }
    return <Navigate to={"/404"} />
  }

  if((!data?.data.orderItems as any).product) {
    return <Navigate to={"/404"} />
  }

  const { address: { address, city, state, country, pincode }, orderItems, user: {firstName}, status, tax, subTotal, discount, shippingCharges,total } = data?.data || defaultData

  const [updateOrder] = useUpdateOrderMutation(); 
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async() => {
    const res = await updateOrder({
      userId: user?._id!, 
      orderId: data?.data._id!
    });
    responseToast(res, navigate, "/admin/transaction");
  } 

  const deleteHandler = async() => {
    alert('processing!')
    const res = await deleteOrder({
      userId: user?._id!, 
      orderId: data?.data._id!
    })
    responseToast(res, navigate, "/admin/transaction");
  }
  return (
    <div className="adminContainer">
      <AdminSideBar />
      {isLoading ? <SkeletonLoader length={100} /> : 
      <main className="transactionCard">
        <section className="products">
          <h1>Order Items</h1>
          {orderItems.map((order: any) => (
            <div className="productCard">
            <img src={ order?.product.coverImage || ""} alt={ order?.product.name } /> 
            <div className="productInfo">
              <Link to={`/product/${order?._id}`}>{ order?.product.name }</Link>
              <span>$ { order?.product.price } X { order.quantity } = ${ order?.product.price * order.quantity } </span>
            </div>
          </div>
          ))}
        </section>
        <article className="shippingInfoCard">
          <button className="product-del-btn" onClick={deleteHandler}><FaTrash/></button>
          <h2>Order Info</h2>
          <h3>User Info</h3>
          <p>{firstName}</p>
          <p>{`${address}, ${city}, ${state}, ${country}, ${pincode}`}</p>
          
          <h3>Amount Info</h3>
          <p>Subtotal: {subTotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h3>Status Info</h3>
          <p>Status: 
            <span className={status === "Delivered" ? "purple" : status === "Shipped" ? "green" : "red"}>
               {status}
            </span>
          </p>
          <button onClick={updateHandler} className="product-process">Process Status</button>
        </article>
      </main> }
    </div>
  )
}



export default TransactionCard


