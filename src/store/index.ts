import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import categories from './categories/categoriesSlice';
import products from './products/productSlice';
import cart from './cart/cartSlice';
import storage from 'redux-persist/lib/storage';
import wishlist from './wishlist/wishlistSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['items'],
};
const wishlistConfig = {
  key: 'wishlist',
  storage,
  whitelist: ['itemsId'],
};

const rootReducer = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  wishlist: persistReducer(wishlistConfig, wishlist),
});

export const store = configureStore({
  reducer: rootReducer,
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
