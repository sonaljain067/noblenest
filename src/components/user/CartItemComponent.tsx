
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { OrderItem } from "../../types/base.types";

const CartItemComponent = ({ product, quantity } : OrderItem) => {
  return (
    <div className="cartItem">
      <img src={product.coverImage} alt="" /> 
      <Link to={`product/${product._id}`}>{product.name}</Link>
      <span>${product.price}</span>
      <div>
        <p>{product.artisan}</p>
      </div>
      <div className="cartIncDec">
        <button>-</button>
        <span><p>{quantity}</p></span>
        <button>+</button>
      </div>
      <button className="cartDel"><FaTrash/></button> 
    </div>
  )
}

export default CartItemComponent