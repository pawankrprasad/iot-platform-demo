/**
 * Auth API
 */

import apiClient from '../lib/axios';

export const authApi = {
  login: (credentials) =>
    apiClient.post('/account/login', credentials).then((r) => r.data),

  logout: () =>
    apiClient.post('/account/logout').then((r) => r.data),

  refreshToken: (refresh_token) =>
    apiClient.post('/account/refresh', { refresh_token }).then((r) => r.data),
};
