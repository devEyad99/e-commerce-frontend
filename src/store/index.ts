import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import categories from './categories/categoriesSlice';
import products from './products/productSlice';
import cart from './cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import wishlist from './wishlist/wishlistSlice';
import auth from './auth/authSlice';
import orders from './orders/orderSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  wishlist: ['user', 'accessToken'],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
  orders,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
