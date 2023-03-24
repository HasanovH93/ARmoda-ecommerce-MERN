import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer, {
  setUserToken,
  setAdminToken,
  clearUserToken,
  clearAdminToken,
} from "./slices/auth-slice";
import storage from "redux-persist/lib/storage";
import productReducer from "./slices/product-slice";
import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
import compareReducer from "./slices/compare-slice";
import wishlistReducer from "./slices/wishlist-slice";

const persistConfig = {
  key: "flone",
  version: 1.1,
  storage,
};

export const rootReducer = combineReducers({
  product: productReducer,
  currency: currencyReducer,
  cart: cartReducer,
  compare: compareReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
});

const autoLogoutMiddleware = (store) => (next) => (action) => {
  if (
    action.type === "auth/setUserToken" ||
    action.type === "auth/setAdminToken"
  ) {
    const { expiresIn } = action.payload;
    setTimeout(() => {
      if (action.type === "auth/setUserToken") {
        store.dispatch(clearUserToken());
      } else {
        store.dispatch(clearAdminToken());
      }
    }, expiresIn * 1000);
  }

  return next(action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(autoLogoutMiddleware), // Add the autoLogoutMiddleware here
});

export const persistor = persistStore(store);
