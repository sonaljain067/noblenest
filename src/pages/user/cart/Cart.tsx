import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, applyDiscount, calculatePrice, removeCartItem } from "../../../redux/reducer/cartReducer";
import { RootState, server } from "../../../redux/store";
import { OrderItem } from "../../../types/base.types";
import CartItemComponent from "./CartItem";

const Cart = () => {
    const dispatch = useDispatch(); const navigate = useNavigate(); 
    const { user } = useSelector((state: RootState) => state.userReducer);
    let { cartItems, shippingCharges, total, discount, tax, subTotal } = useSelector((state: RootState) => state.cartReducer)

    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCoupon] = useState<boolean>(false); 

    const incrementHandler = (cartItem: OrderItem) => {
        if(cartItem.quantity >= cartItem.product.stock) return; 
        dispatch(addToCart({order: {...cartItem, quantity: cartItem.quantity + 1}, flag: false}));
    }
    const decrementHandler = (cartItem: OrderItem) => {
        if(cartItem.quantity <= 1) return; 
        dispatch(addToCart({order: {...cartItem, quantity: cartItem.quantity - 1}, flag: false}));
    }
    const removeHandler = (productId: string) => {
        dispatch(removeCartItem(productId))
    }
    useEffect(() => {
        const {token, cancel} = axios.CancelToken.source();
        const timeOutId = setTimeout(() => {
            axios.get(`${server}/h/coupon?coupon=${couponCode}&id=${user?._id}`, {
                cancelToken: token,
            })
            .then((res) => {
                dispatch(applyDiscount(res.data.data))
                setIsValidCoupon(true); 
                dispatch(calculatePrice());
            })
            .catch(() => {
                setIsValidCoupon(false); 
                dispatch(applyDiscount(0));
                dispatch(calculatePrice())
            })
        },1000);

        return() => {
            clearTimeout(timeOutId); 
            cancel();
            setIsValidCoupon(false); 
        }
    }, [couponCode])
    useEffect(() => {
        dispatch(calculatePrice())
    }, [cartItems]); 
    useEffect(() => {
        if(cartItems.length <= 0) 
            return navigate("/shop")
    }, [cartItems])

    return (
        <div className="cart">
            <h1>Cart</h1>
            <section className="cartTable">
                {cartItems.map(cartItem => (
                    <CartItemComponent cartItem={cartItem} incrementHandler={() => incrementHandler(cartItem)} decrementHandler={() => decrementHandler(cartItem)} removeHandler={removeHandler}/>
                ))}
            </section>
            <section className="cartActions">
                <div className="couponCode">
                    <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                    {couponCode && (isValidCouponCode ? (
                        <p className="green">₹{discount} off using <code>{couponCode}</code></p>
                    ): (
                        <p className="red">Invalid Coupon <VscError/></p>
                    ))}
                </div>
                <div className="actions">
                    <Link to="/shop"><button className="continueShop">Continue Shopping</button></Link>
                </div>
            </section>
            <section className="cartTotalSection">
                    <h3>Cart Total</h3>
                    <div className="cartTotal">
                        <div className="priceName">
                            <p>SubTotal </p>
                            <p>Shipping Charges</p>
                            <p>Tax</p>
                            <p>Discount</p>
                            <p>Total</p>
                        </div>
                        <div className="priceValue">
                            <p>${subTotal}</p>
                            <p>${shippingCharges}</p>
                            <p>${tax}</p>
                            <p className="green">- ${discount}</p>
                            <p>${total}</p>
                        </div>
                    </div>
                    {/* todo: create rzp order */}
                    <button className="checkout" onClick={() => {}}>
                        <Link to="/checkout">Proceed to Checkout</Link>
                    </button>
                </section>
        </div>
    )
}

export default Cart


