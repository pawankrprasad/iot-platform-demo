
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

function setTokens({ access_token, refresh_token }) {
  localStorage.setItem('access_token', access_token);
  if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
}

function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach Bearer token
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Token-refresh state (prevents concurrent refresh races)
// ---------------------------------------------------------------------------

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function notifySubscribers(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

// ---------------------------------------------------------------------------
// Response interceptor — handle 401 with silent token refresh
// ---------------------------------------------------------------------------

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Queue the request until the refresh completes
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(original));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(normalizeError(error));
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        setTokens(data);
        isRefreshing = false;
        notifySubscribers(data.access_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(original);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        clearTokens();
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(normalizeError(refreshError));
      }
    }

    return Promise.reject(normalizeError(error));
  },
);

// ---------------------------------------------------------------------------
// Normalize errors into a consistent shape
// { message, status, code, details }
// ---------------------------------------------------------------------------

function normalizeError(error) {
  if (error.response) {
    const { status, data } = error.response;
    const message =
      data?.message ?? data?.error ?? error.message ?? 'An error occurred';
    const normalized = new Error(message);
    normalized.status = status;
    normalized.code = data?.code ?? null;
    normalized.details = data?.details ?? null;
    return normalized;
  }
  if (error.request) {
    const networkError = new Error('Network error — no response received');
    networkError.status = 0;
    return networkError;
  }
  return error;
}

export { setTokens, clearTokens };
export default apiClient;
