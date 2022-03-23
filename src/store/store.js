import { configureStore } from '@reduxjs/toolkit';
import { lifeApi } from '../services/gameoflifeapi';

export const store = configureStore({
  reducer: {
    [lifeApi.reducerPath]: lifeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lifeApi.middleware),
});
