import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="details">
      <img src={data.image} alt={data.title} />
      <div>
        <h2>{data.title}</h2>
        <p><strong>Category:</strong> {data.category}</p>
        <p>{data.description}</p>
        <h3>${data.price}</h3>
        <button onClick={() => dispatch(addToCart(data))}>Add to Cart</button>
        <br /><br />
        <Link to="/">Back to Products</Link>
      </div>
    </div>
  );
}
