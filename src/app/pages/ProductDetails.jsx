import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();

  if (isLoading) return <div style={{textAlign: 'center', padding: '100px'}}>Loading Product...</div>;

  return (
    <div className="chaldal-details">
      <div className="details-image">
        <img src={data.image} alt={data.title} />
      </div>

      <div className="details-info">
        <p style={{ color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
          {data.category}
        </p>
        <h2>{data.title}</h2>
        
        <div className="details-badges">
          <span className="details-price">${data.price}</span>
          <span style={{ padding: '8px', fontWeight: '600' }}>⭐ {data.rating?.rate}</span>
        </div>

        <p className="description">{data.description}</p>

        <div className="details-actions" style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
          <button 
            className="btn-add" 
            style={{ padding: '15px 40px' }} 
            onClick={() => {
              dispatch(addToCart(data));
              toast.success("🛒 Added to cart!");
            }}
          >
            Add to Cart
          </button>
          <Link className="btn-view" to="/" style={{ padding: '15px 30px', border: '1px solid #cbd5e1' }}>
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
