import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "../../features/cart/selectors";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (!items.length) {
    return (
      <div className="cart-empty-state">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Start shopping to fill it up!</p>
        <Link to="/">
          <button className="btn-primary-large">🛍️ Start Shopping</button>
        </Link>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.error("🗑️ Item removed from cart", {
      style: { background: '#ef4444', color: 'white' }
    });
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <span className="cart-count">({totalItems} items)</span>
      </div>

      <div className="cart-items-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <div className="cart-price">${item.price.toFixed(2)}</div>
              <div className="quantity-control">
                <button 
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="qty">{item.quantity}</span>
                <button 
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <div className="subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
            <button 
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary-card">
        <div className="summary-row">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="summary-row total">
          <span>Total Price:</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div className="cart-actions">
          <button 
            className="btn-secondary-large"
            onClick={() => {
              dispatch(clearCart());
              toast.warning("🧹 Cart cleared!", {
                style: { background: '#f59e0b', color: 'white' }
              });
            }}
          >
            🧹 Clear Cart
          </button>
          <button 
            className="btn-primary-large"
            onClick={() => toast.info("🚀 Checkout feature coming soon!")}
          >
            💳 Checkout Securely
          </button>
        </div>
      </div>
    </div>
  );
}
