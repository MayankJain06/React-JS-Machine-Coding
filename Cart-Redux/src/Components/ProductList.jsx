import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductList = ()=>{
const dispatch = useDispatch();
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const fetchProducts = async ()=>{
    try {
        setLoading(true);
        const data = await fetch("https://dummyjson.com/products?limit=10");
        const res = await data.json();
        setProducts(res.products);
    }
    catch(e) {
    setError("Error Fetching the Data from the API:", e.message);
    } 
    finally {
    setLoading(false);
    }
}

useEffect(()=>{
    fetchProducts();
},[])

if(loading) return <h1>Loading....</h1>;
if(error) return <h1>Error Fetching the Products from the API</h1>

return (
    <div>{products.map((product,index)=>{
        return (
            <div>
            <h1>{product.title}</h1>
            <h2>{product.category}</h2>
            <h2>{product.price}</h2>
            <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
            </div>
        )
    })}</div>
)
}

export default ProductList;