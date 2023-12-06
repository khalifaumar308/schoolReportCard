import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { appApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);
