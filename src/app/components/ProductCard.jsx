import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { toggleFavorite, selectFavorites } from "../../features/cart/favoritesSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.includes(product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("🛒 Added to cart!", { 
      style: { background: '#10b981', color: 'white' }
    });
  };

  const handleToggleFav = () => {
    dispatch(toggleFavorite(product.id));
    toast.info(isFav ? "❤️ Removed from favorites" : "💖 Added to favorites!", {
      style: { background: '#3b82f6', color: 'white' }
    });
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-overlay">
          <button className="overlay-btn primary" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
          <Link className="overlay-btn secondary new-details-btn" to={`/product/${product.id}`}>
            👁️ Details
          </Link>
        </div>
        <button 
          className={`favorite-btn ${isFav ? "active" : ""}`} 
          onClick={handleToggleFav}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "💖" : "🤍"}
        </button>
        <div className="product-badges">
          <span className="price-badge">${product.price.toFixed(2)}</span>
          <span className="rating-badge">
            ⭐ {product.rating?.rate || "N/A"}
          </span>
        </div>
      </div>
      <div className="product-info">
        <h4 title={product.title}>
          {product.title.length > 35 
            ? product.title.slice(0, 35) + "..." 
            : product.title
          }
        </h4>
        <div className="product-category">{product.category}</div>
      </div>
    </div>
  );
}
