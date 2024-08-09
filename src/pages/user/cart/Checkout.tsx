import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "../../../components/Loader";
import { useCreateOrderMutation } from "../../../redux/api/orderAPI";
import { useCreateAddressMutation, useFetchUserAddressesQuery } from "../../../redux/api/userAPI";
import { clearShippingInfo, resetCart, saveShippingInfo } from "../../../redux/reducer/cartReducer";
import { RootState, server } from "../../../redux/store";
import { CreateOrderRequest, ErrorAPIResponse } from "../../../types/api.types";
import { Address } from "../../../types/base.types";

const Checkout = () => {
    const navigate = useNavigate(); const dispatch = useDispatch(); 
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const { user } = useSelector((state: RootState) => state.userReducer);
    let { cartItems, shippingCharges, address, discount, tax, total } = useSelector((state: RootState) => state.cartReducer)
    const [isProcessing, _] = useState<boolean>(false); 
    let { data: add, isLoading, isError, error } = useFetchUserAddressesQuery(user?._id); 
    if(!isLoading) {
        
    }
    if(isError) {
        const err = (error as ErrorAPIResponse)?.data.message
        if(err) toast.error(err);  
        else {
            console.log(error)
            toast.error("Internal Server Error!!")
        }
    }
    const [Razorpay] = useRazorpay(); 
    const [createAddress] = useCreateAddressMutation();
    const [createOrder] = useCreateOrderMutation()

    const [shippingInfo, setShippingInfo] = useState<Omit<Address, "_id">>({
        address: "", 
        city: "",
        state: "",
        country: "",
        pincode: "",
        deliveryInstructions: ""
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setShippingInfo((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(cartItems.length <= 0) 
            return navigate("/shop")
    }, [cartItems])
    
    let orderData = {
        orderItems: cartItems, 
        address: address?._id, 
        tax,
        shippingCharges,
        discount
    };

    const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if(address.city === "") {
            const { data } = await createAddress({address: shippingInfo, id: user?._id})
            dispatch(saveShippingInfo(data?.data!))
        } 
        try {
            const { data } = await axios.post(`${server}/checkout/order?id=${user?._id}`, {
                amount: total
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!data.data.id) {
                toast.error("RZP Order ID missing!")
            }
            const options: RazorpayOptions = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: (total*100).toString(),
                currency: "INR",
                name: "Noblenest",
                order_id: data?.data.id,
                retry: {
                    enabled: false
                }, 
                handler: async(response) => {
                    let updatedOrder: CreateOrderRequest = {
                        ...orderData, 
                        rzpPaymentId: response.razorpay_payment_id,
                        rzpOrderId: response.razorpay_order_id,
                        rzpSignature: response.razorpay_signature,
                        status: "Paid"
                    }
                    await createOrder({order: updatedOrder, id: user._id});
                    dispatch(resetCart()); 
                    toast.success("Payment success!!")
                    navigate("/");
                },
                theme: {
                    color: '#006888'
                },
                prefill: {
                    contact: user.phone, 
                    email: user.email
                }
            }
            const paymentObject = new Razorpay(options);
            paymentObject.on('payment.failed', async function(response: any) {
                let updatedOrder: CreateOrderRequest = {
                    ...orderData,
                    rzpOrderId: data?.data.id,
                    status: "Failed",
                    rzpPaymentId: "",
                    rzpSignature: ""
                }
                await createOrder({order: updatedOrder, id: user?._id}); 
                dispatch(clearShippingInfo());
                response(response, navigate, "/cart"); 
            })
            paymentObject.open(); 

        } catch(error){
            const err = (error as ErrorAPIResponse)?.data.message
            if(err) toast.error(err);  
            else {
                console.log(error)
                toast.error("Internal Server Error!!")
            }
        }
    }
    const addressHandler = (address: Address) => {
        setShippingInfo(address); dispatch(saveShippingInfo(address)); 
        setSelectedAddressId(address._id);
    }
    return (
        
        <div className="shipping deliveryInfo">
            <button onClick={() => navigate("/cart")} id="shippingBackButton"><BiArrowBack /></button>
            <h1>Shipping Address</h1>
            {isLoading ? <SkeletonLoader/> : (<div className="savedAddresses">
            <h2>Saved Addresses to choose from</h2>
                {add?.data.map((address: any) => (
                    <div className="addressTile" key={address._id}>
                        <input type="radio" name="address" value={address._id} checked={selectedAddressId == address._id} onChange={() => addressHandler(address)}/> 
                        {address.address}, {address.city}, {address.state}, {address.pincode}, {address.country}
                    </div>
                ))}
            </div>)}
            <form onSubmit={submitHandler}>
                <h2>Delivery Info</h2>
                <div className="street">
                    <label>Street *</label>
                    <input required type="text" name="address" id="" value={shippingInfo.address} onChange={changeHandler}/>
                </div>
                <div className="cityState">
                    <div className="city">
                        <label>Town / City *</label>
                        <input required type="text" placeholder="Faridabad" name="city" value={shippingInfo.city} onChange={changeHandler}/>
                    </div>
                    <div className="state">
                        <label>State *</label>
                        <input required type="text" placeholder="Himachal Pradesh" name="state"value={shippingInfo.state} onChange={changeHandler}/>
                    </div>
                </div>
                <div className="pinCountry">
                    <div className="pin">
                        <label>Pin Code *</label>
                        <input type="text" placeholder="861234" name="pincode" value={shippingInfo.pincode} onChange={changeHandler}/>
                    </div>
                    <div className="country">
                        <label>Country *</label>
                        <select required name="country" value={shippingInfo.country} onChange={changeHandler}>
                            <option value="">Choose Country</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="Australia">Australia</option>
                            <option value="Antartica">Antartica</option>
                            <option value="New Zealand">New Zealand</option>
                        </select>
                    </div>
                    
                </div>
                <div className="notes">
                    <label>Delivery Instructions(optional)</label>
                    <textarea name="notes" id="" cols={30} rows={8}></textarea>
                </div> 
                <div id="payBtn">
                    <button id="payNow" type="submit">{isProcessing ? "Processing" : "Pay Now"}</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout