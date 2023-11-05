import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
    people: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
    getPeople: (state, action) => {
      state.people = action.payload;
    },
  },
});

export const { getApiConfiguration, getGenres, getPeople } = homeSlice.actions;

export default homeSlice.reducer;
