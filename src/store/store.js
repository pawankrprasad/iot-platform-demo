import { configureStore } from '@reduxjs/toolkit';
import authReducer, { forceLogout } from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  devTools: import.meta.env.DEV,
});

// ---------------------------------------------------------------------------
// Forward the Axios interceptor's auth:logout window event into Redux
// so every slice can react to a forced session expiry.
// ---------------------------------------------------------------------------
window.addEventListener('auth:logout', () => {
  store.dispatch(forceLogout());
});

export default store;
