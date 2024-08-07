import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartItemComponentProps } from '../../../types/dash.types';

const CartItemComponent = ({cartItem, incrementHandler, decrementHandler, removeHandler}: CartItemComponentProps) => {
    const { product, quantity }  = cartItem;
    const [fetchQuantity, setFetchQuantity] = useState<number>(quantity); 
    useEffect(() => {
        setFetchQuantity(cartItem.quantity); 
    }, [cartItem])  
  return (
    <div className="cartItem">
        <img src={product.coverImage} alt={product.name} />
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <span>₹{product.price}</span>
        <div>
            <p>{product.artisan}</p>
        </div>
        <div className="cartIncDec">
            <button onClick={() => decrementHandler(cartItem)}>-</button>
            <span><p>{fetchQuantity}</p></span>
            <button onClick={() => incrementHandler(cartItem)}>+</button>
        </div>
        <button className="cartDel" onClick={() => removeHandler(product._id)}>
            <FaTrash/>
        </button>
    </div>
  )
}

export default CartItemComponent