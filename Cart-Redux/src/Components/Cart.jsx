import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, incrementQty, decrementQty } from "../features/cart/cartSlice";


 function Cart() {

    const {items}= useSelector(state=>state.cart);

    const dispatch = useDispatch();

    const total = items.reduce((acc,item)=> acc + item.price * item.quantity, 0);


    return (
        <div>
            <h2>Cart</h2>
            {items.length == 0 && <p>Cart is Empty</p>}
            {items.map((item)=>(
                <div key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.price}</p>
                    
                    <button onClick={()=>dispatch(incrementQty(item.id))}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>dispatch(decrementQty(item.id))}>-</button>

                    <button onClick={()=>dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
            ))}

            <h3>Total : {total}</h3>
        </div>
    )
}

export default Cart;