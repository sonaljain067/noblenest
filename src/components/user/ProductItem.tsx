import { ProductProps } from '../../types/dash.types';
import { TbShoppingCart, TbShoppingCartCopy } from 'react-icons/tb'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import Rating from '../Rating'
import { Link } from 'react-router-dom';

const ProductItem = (
    { _id, name, price, coverImage, stock, rating = 5, isWishlisted = false, isAddedOnCart = false, handler }: ProductProps) => (
    <div className="product" id={`${_id}`}>
        <div className="productImage">
            <img src={coverImage} alt="Product Image" />
            <span className="isProductOnSale">
                {
                    stock < 0 ?  "Out of Stock" : "Sale"
                }
            </span>
            <span className="isProductOnWishlist">
                {
                    isWishlisted ? <FaHeart /> : <FaRegHeart /> 
                }
            </span>
            <span className="isProductOnCart">
                {
                    isAddedOnCart ? <TbShoppingCartCopy/> : <button onClick={() => handler({ quantity: 1, product: {_id, name, price, stock, coverImage } })}><TbShoppingCart/></button>
                }
            </span>
        </div>
        <Link to={`/product/${_id}`}>
            <div className="productInfo">
                <p className="productName">{name}</p>
                <p>{stock > 0 && stock}</p>
                { <span className="actualPrice">${`${price}.00`}</span> }
                <div className="rating">
                    <Rating rating={rating} />
                </div>
            </div>
        </Link>
    </div>
)


export default ProductItem