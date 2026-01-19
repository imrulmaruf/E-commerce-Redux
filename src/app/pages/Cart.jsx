import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "../../features/cart/selectors";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../../features/cart/cartSlice";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  if (!items.length) return <p style={{ padding: 20 }}>Your cart is empty</p>;

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 15 }}>
      {items.map(item => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #ddd", paddingBottom: 10 }}>
          <img src={item.image} alt={item.title} style={{ height: 60, objectFit: "contain" }} />
          <div style={{ flex: 1 }}>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
            <div>
              <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
              {item.quantity}
              <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
            </div>
          </div>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}
