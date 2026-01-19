import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart"));

const initialState = { items: savedCart || [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) { item.quantity += 1; localStorage.setItem("cart", JSON.stringify(state.items)); }
    },
    decreaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else state.items = state.items.filter(i => i.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = state => state.cart.items;
export const selectTotalItems = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectTotalPrice = state => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
