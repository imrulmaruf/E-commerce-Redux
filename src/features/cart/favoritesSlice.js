import { createSlice } from "@reduxjs/toolkit";

const savedFav = JSON.parse(localStorage.getItem("favorites"));

const initialState = { items: savedFav || [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter(f => f !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
export const selectFavorites = state => state.favorites.items;
export const isFavorite = (state, id) => state.favorites.items.includes(id);
