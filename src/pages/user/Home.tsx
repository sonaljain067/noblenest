import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SkeletonLoader } from "../../components/Loader";
import Rating from "../../components/Rating";
import ProductItem from "../../components/user/ProductItem";
import { useCategoriesQuery } from "../../redux/api/categoryAPI";
import { useLatestProductsQuery } from "../../redux/api/productAPI";
import { addToCart } from "../../redux/reducer/cartReducer";
import { updateCategory } from "../../redux/reducer/productReducer";
import { ErrorAPIResponse } from "../../types/api.types";
import { OrderItem } from "../../types/base.types";

const Home = () => {
    const { data, isLoading = true, isError, error } = useLatestProductsQuery(""); 
    const { data: categoriesResponse, isError: isErrorCategories, error: categoryError, isLoading: categoryLoading } = useCategoriesQuery("");
    const dispatch = useDispatch(); 

    if(isErrorCategories) {
        const err = (categoryError as ErrorAPIResponse)?.data.message
        if(err) toast.error(err);  
        else {
            console.log(categoryError)
            toast.error("Internal Server Error!!")
        }
    }
    if(isError) {
        const err = (error as ErrorAPIResponse)?.data.message
        if(err) toast.error(err);  
        else {
            console.log(error)
            toast.error("Internal Server Error!!")
        }
    }
    
    const addToCartHandler = (cartItem: OrderItem) => {
        if(cartItem.product.stock < 1) return toast.error("Out of Stock!"); 
        dispatch(addToCart({order: cartItem, flag: true})); 
        toast.success("Added to Cart!")
    }

    return (
    <div className="userDashboardDiv">
        <section className="dashboardOverlayImageSection">
            <img src={"https://images.unsplash.com/photo-1597696929644-a2157a251a43?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ix_id=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBvdHRlcnl8ZW58MHwwfDB8fHww"} />
            <article>
                <h1>Set Your Decor</h1>
                <p>with organic, moders and handmade items</p>
                <Link to="/shop">Shop Now</Link>
            </article>
        </section>
        <section className="dashboardProductCategoriesSection">
            <h1>Find the Perfect Handmade</h1>
            <p>Our collections</p>
            <article className="productCategories">
                {categoryLoading ? <SkeletonLoader length={4} /> : (
                    categoriesResponse?.data.map((category: any) => (
                        <div className="productCategory">
                            <div className="cloud" id={`cloud${Math.floor(Math.random()*4) + 1}`}></div>
                            <div className="icon">
                                <Link to="/shop"><button onClick={() => dispatch(updateCategory(category._id))}
                                    >{category.name}</button></Link>
                            </div>
                        </div>
                    ))
                )}
            </article>
        </section>
        <section className="dashboardTopFeaturedBestSellerSection">
            <h1>Top Picks for you</h1>
            <p>Featured / Best Seller</p>
            <div className="popularProducts">
            {
                isLoading ? <SkeletonLoader length={20}/> : (
                    data?.data && data?.data.slice(0,12).map(i => (
                        <ProductItem 
                            _id={i._id} 
                            name={i.name} 
                            price={i.price} 
                            stock={i.stock} 
                            rating = {5} 
                            coverImage={i.coverImage} 
                            isOnSale={true} 
                            handler={() => addToCartHandler({quantity: 1, product: {stock: i.stock, _id: i._id, name: i.name, price: i.price, coverImage: i.coverImage}})}
                        /> 
                    ))
                )
            }
            </div>
        </section>
        <section className="dashboardCustomerTestimonialSection">
            <h1>Hear from Other Happy Consumers</h1>
            <p>Customer testimonials</p>
            <article className="testimonials">
                <div className="testimonial">
                    <div className="rating"><Rating rating={4}/></div>
                    <p className="testimony">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit qui suscipit illo, est officiis totam perspiciatis possimus ipsum, ab asperiores beatae quis dolores exercitationem eos similique id soluta numquam tenetur.</p>
                    <div className="customerInfo">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="" />
                        <h4 className="customerName">Jessica</h4>
                    </div>
                </div>
                <div className="testimonial">
                    <div className="rating"><Rating rating={4}/></div>
                    <p className="testimony">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit qui suscipit illo, est officiis totam perspiciatis possimus ipsum, ab asperiores beatae quis dolores exercitationem eos similique id soluta numquam tenetur.</p>
                    <div className="customerInfo">
                        <img src="https://randomuser.me/api/portraits/men/7.jpg" alt="" />
                        <h4 className="customerName">John Smith</h4>
                    </div>
                </div>
                <div className="testimonial">
                    <div className="rating"><Rating rating={4}/></div>
                    <p className="testimony">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit qui suscipit illo, est officiis totam perspiciatis possimus ipsum, ab asperiores beatae quis dolores exercitationem eos similique id soluta numquam tenetur.</p>
                    <div className="customerInfo">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="" />
                        <h4 className="customerName">Jessica</h4>
                    </div>
                </div>
            </article>
        </section>
        <section className="dashboardSiteFeaturesSection">
            <div className="customerCare feature">
                <img src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1717930064/Noble%20Nest/User/Dashboard/24X7CustomerCare.png" alt="" />
                <h1>Customer Care</h1>
                <p>24h followup</p>
            </div>
            <div className="freeShip feature">
            <img src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1717930064/Noble%20Nest/User/Dashboard/freedelivery.png" alt="" />
                <h1>Free Ship</h1>
                <p>Free shipping for $1500 and up</p>
            </div>
            <div className="return feature">
                <img src="https://res.cloudinary.com/dyu8bj7ko/image/upload/v1717930064/Noble%20Nest/User/Dashboard/return.png" alt="" />
                <h1>Return</h1>
                <p>Within 7 days</p>
            </div>
        </section>
    </div>
  )
}

export default Home