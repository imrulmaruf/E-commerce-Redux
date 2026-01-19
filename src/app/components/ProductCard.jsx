import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice"; 
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid #ddd", padding: 10 }}>
      <img src={product.image} alt={product.title} height={100} />
      <h4>{product.title.length > 50 ? product.title.slice(0,50)+"..." : product.title}</h4>
      <p>${product.price}</p>
      <p>⭐ {product.rating?.rate || "N/A"}</p>
      <Link to={`/product/${product.id}`} style={{ margin: "5px 0" }}>View</Link>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
}
