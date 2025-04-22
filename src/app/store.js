import { configureStore } from '@reduxjs/toolkit'

import { QuickMatchApi } from '../api/QuickMatchQuery';
 
import { WebSocketApi } from '../api/WebSocketQuery';

export const store = configureStore({
  reducer: {
    [QuickMatchApi.reducerPath]:QuickMatchApi.reducer,
    [WebSocketApi.reducerPath]:WebSocketApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(QuickMatchApi.middleware)
      .concat(WebSocketApi.middleware)
})




