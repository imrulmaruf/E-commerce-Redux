import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi";
import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/cart/favoritesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,      
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
