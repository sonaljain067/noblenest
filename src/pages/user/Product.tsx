import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GrFacebookOption, GrInstagram, GrPinterest, GrRefresh, GrTwitter } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonLoader } from "../../components/Loader";
import Rating from "../../components/Rating";
import { useProductDetailsQuery } from "../../redux/api/productAPI";
import { addToCart } from "../../redux/reducer/cartReducer";
import { ErrorAPIResponse } from "../../types/api.types";
import { OrderItem } from "../../types/base.types";

const Product = () => {
    const params = useParams(); 
    const dispatch = useDispatch(); 
    
    const { data, isLoading, isError, error } = useProductDetailsQuery(params.id!);
    const [itemCount, setItemCount] = useState<number>(1); 
    const [ isWishlisted, setIsWislisted ] = useState<boolean>(false); 
    const [ descOrReview, setDescOrReview ] = useState<string> ("d"); 

    let { _id, coverImage, artisan, name, price, stock, description, subCategory, images} = data?.data || {
        _id: "", name: "", price: 0, stock: 0, description: "", images: [], artisan: {businessName: ""}, coverImage: "", subCategory: {_id: "", category: {name: ""}, name: ""}
    }
    const incrementHandler = (cartItem: OrderItem) => {
        if(cartItem.quantity >= cartItem.product.stock) return; 
        setItemCount(itemCount + 1);
    }
    const decrementHandler = (cartItem: OrderItem) => {
        if(cartItem.quantity <= 1) return; 
        setItemCount(itemCount - 1);
    }
    const toggleWishlist = () => {
        setIsWislisted(!isWishlisted); 
    }
    const refreshPage = () => {

    }
    if(isError) {
        const err = (error as ErrorAPIResponse).data.message
        toast.error(err);  
      }
    const addToCartHandler = (cartItem: OrderItem) => {
        if(cartItem.product.stock < 1) return toast.error("Out of Stock!"); 
        dispatch(addToCart({order: cartItem, flag: false, dir: true})); 
        
        toast.success("Added to Cart!")
    }
    const descriptionReview = (show: string) => {
        if(show == "d") setDescOrReview("d");
        else setDescOrReview("r");
    }
    const orderData = {
        quantity: itemCount, 
        product: {
            _id: _id, 
            stock: stock, 
            name: name, 
            price: price, 
            coverImage
        }
    }
    return (
        <div className="productDetail">
            <h3>Home / <span className="blue">Products</span></h3>
            {isLoading ? <SkeletonLoader/> : (<>
                <section className="productDetailContainer">
                <div className="productImages">
                    <div className="largeProductImage">
                        <img src={coverImage} alt="Cover Image" />
                    </div>
                    <div className="smallProductImages">
                        {images && images.map((image: string) => (
                            <img src={image}/>
                        ))}
                    </div>
                </div>
                <div className="productDetailInfo">
                    <div className="productInfo">
                        <h3>{name}</h3>
                        <h2 className="price">${price}</h2>
                        <div className="ratingReviewCount">
                        <div className="rating">
                            <Rating rating={5} />
                        </div>
                        <span>(14 reviews)</span>
                        </div>
                        <div className="description">
                            {description}
                        </div>
                        <div className="socialShare">
                        <p>Share this: </p>
                        <ul className="socials">
                            <li><GrInstagram/></li>
                            <li><GrTwitter/></li>
                            <li><GrFacebookOption/></li>
                            <li><GrPinterest/></li>
                        </ul>
                        </div>
                        <div className="cartActions">
                            <div className="cartItems">
                                <button onClick={() => decrementHandler(orderData)}>-</button>
                                <button className="item">{itemCount}</button>
                                <button disabled={itemCount >= 100} onClick={() => incrementHandler(orderData)}>+</button>
                            </div>
                            <button className="addToCart" onClick={() => addToCartHandler(orderData)}>
                                <IoMdCart/> Add to Cart
                            </button>
                            <button className="wishlist" onClick={toggleWishlist}>
                                {
                                    !isWishlisted ? <FaRegHeart/> : <FaHeart/>
                                }
                            </button>
                            <button className="refresh" onClick={refreshPage}>
                                <GrRefresh/>
                            </button>
                        </div>
                    </div>
                    <div className="productInformation">
                        <h3>Short Information</h3>
                        <div className="informationDetails">
                            <p>
                                <span>Category: </span> {subCategory.category.name}
                            </p>
                            <p>
                                <span>Subcategory: </span> {subCategory.name}
                            </p>
                            <p>
                                <span>Artisan: </span> {artisan.businessName}
                            </p>
                            <p>
                                <span>Stock: </span> {stock}
                            </p>
                        </div>
                    </div>
                    <div className="checkoutInfo">
                        <h3>Guaranteed Safe Checkout</h3>
                        <img src="https://imgs.search.brave.com/cz3BKgLYt7Iou9rjvXSHRJU0HH2hqHDmQ1QEMSQgJ1Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzE2LzkzLzA3/LzM2MF9GXzQxNjkz/MDczOV9VZXVtdU1P/NVFoWk9YSUFjMDlz/N2d6NkpTUFQ5N2R1/Uy5qcGc" alt="" id="networkLine1" />

                    </div>
                </div>
            </section>
            <section className="productDescriptionContainer">
                <div className="productDescReview">
                    <div className="options">
                        <button onClick={() => descriptionReview("d")}>Description</button>
                        <button onClick={() => descriptionReview("r")}>Reviews (14) </button>
                    </div>
                
                    {
                        descOrReview == "d" && <p>Description: orem ipsum dolor sit amet consectetur adipisicing elit. Nam minima corrupti id cumque eius molestiae magni deserunt? Eius eligendi quod aperiam alias error sit inventore dolor suscipit ipsa nulla. Corrupti?</p>
                    }
                    {
                        descOrReview == "r" && <p>Reviews: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minima corrupti id cumque eius molestiae magni deserunt? Eius eligendi quod aperiam alias error sit inventore dolor suscipit ipsa nulla. Corrupti?</p>
                    }
                </div>
            </section> 
            </>) }
        </div>
    )
}

export default Product 