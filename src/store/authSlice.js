/**
 * Auth Slice — plain reducers only, no thunks.
 *
 * Components call the API themselves, then dispatch the appropriate action:
 *   loginSuccess(payload)  — after a successful login API call
 *   loginFailed(message)   — after a failed login API call
 *   logoutAction()         — after calling the logout API (or on sign-out)
 *   bootstrapSuccess(user) — after /me validates the stored token on reload
 *   bootstrapFailed()      — when the stored token is invalid / expired
 *   setBootstrapped()      — when there is no token at all (skip /me call)
 *   setLoading()           — before any async auth operation
 *   forceLogout()          — triggered by the Axios interceptor on 401 refresh failure
 *
 * State shape:
 *   user           — profile object returned by the backend (null until loaded)
 *   accessToken    — JWT access token (mirrored from localStorage)
 *   refreshToken   — JWT refresh token (mirrored from localStorage)
 *   isAuthenticated
 *   status         — 'idle' | 'loading' | 'succeeded' | 'failed'
 *   error          — last error message string | null
 *   bootstrapped   — true once the session-restore check has finished
 */

import { createSlice } from '@reduxjs/toolkit';
import { setTokens as persistTokens, clearTokens } from '../lib/axios';

const initialState = {
  user: null,
  accessToken: localStorage.getItem('access_token') ?? null,
  refreshToken: localStorage.getItem('refresh_token') ?? null,
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
  status: 'idle',
  error: null,
  bootstrapped: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Call before firing a login / logout request to show loading state */
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },

    /**
     * Dispatch after a successful login API response.
     * payload: { accessToken, refreshToken, user? }
     */
    loginSuccess(state, { payload }) {
      const { accessToken = '', refreshToken = '', user = null } = payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.user = user;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
      state.bootstrapped = true;
      persistTokens({ access_token: accessToken, refresh_token: refreshToken });
    },

    /**
     * Dispatch when the login API call fails.
     * payload: error message string
     */
    loginFailed(state, { payload }) {
      state.status = 'failed';
      state.error = payload ?? 'Login failed';
      state.isAuthenticated = false;
      state.bootstrapped = true;
    },

    /** Dispatch after calling the logout API (or on sign-out button click) */
    logoutAction(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      clearTokens();
    },

    /**
     * Dispatch when GET /me succeeds on app reload.
     * payload: user profile object
     */
    bootstrapSuccess(state, { payload }) {
      state.user = payload;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.bootstrapped = true;
    },

    /**
     * Dispatch when GET /me returns 401 (token definitively invalid).
     * Clears all auth state.
     */
    bootstrapFailed(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.bootstrapped = true;
      clearTokens();
    },

    /**
     * Dispatch when there is no token in localStorage at all.
     * Marks bootstrap complete without touching auth state.
     */
    setBootstrapped(state) {
      state.bootstrapped = true;
      state.status = 'idle';
    },

    /**
     * Dispatched by the store when the Axios interceptor fires the
     * 'auth:logout' window event (silent token refresh failed mid-session).
     */
    forceLogout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.bootstrapped = true;
      state.status = 'idle';
      state.error = null;
      clearTokens();
    },
  },
});

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export const {
  setLoading,
  loginSuccess,
  loginFailed,
  logoutAction,
  bootstrapSuccess,
  bootstrapFailed,
  setBootstrapped,
  forceLogout,
} = authSlice.actions;

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser             = (state) => state.auth.user;
export const selectAuthStatus       = (state) => state.auth.status;
export const selectAuthError        = (state) => state.auth.error;
export const selectIsBootstrapped   = (state) => state.auth.bootstrapped;
export const selectAccessToken      = (state) => state.auth.accessToken;

export default authSlice.reducer;
