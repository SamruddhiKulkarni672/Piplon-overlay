// store/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { QuickMatchApi } from "../api/QuickMatchQuery";
import { WebSocketApi } from "../api/WebSocketQuery";

// Slice for controller state
const controllerSlice = createSlice({
  name: "controller",
  initialState: {
    showRank: JSON.parse(localStorage.getItem("showRank")) || false,
    showBowler: JSON.parse(localStorage.getItem("showBowler")) || false,
    fourAnimation: JSON.parse(localStorage.getItem("fourAnimation")) || false,
    sixAnimation: JSON.parse(localStorage.getItem("sixAnimation")) || false,
  },
  reducers: {
    toggleRank: (state) => {
      state.showRank = !state.showRank;
      localStorage.setItem("showRank", JSON.stringify(state.showRank));
    },
    toggleBowler: (state) => {
      state.showBowler = !state.showBowler;
      localStorage.setItem("showBowler", JSON.stringify(state.showBowler));
    },
    four: (state) => {
      state.fourAnimation = !state.fourAnimation;
      localStorage.setItem(
        "fourAnimation",
        JSON.stringify(state.fourAnimation)
      );
    },
    six: (state) => {
      state.sixAnimation = !state.sixAnimation;
      localStorage.setItem("sixAnimation", JSON.stringify(state.sixAnimation));
    },
  },
});

// Exporting actions and store
export const { toggleRank, toggleBowler, four, six } = controllerSlice.actions;

export const store = configureStore({
  reducer: {
    controller: controllerSlice.reducer,
    [QuickMatchApi.reducerPath]: QuickMatchApi.reducer,
    [WebSocketApi.reducerPath]: WebSocketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(QuickMatchApi.middleware)
      .concat(WebSocketApi.middleware),
});
