/**
 * Auth API
 */

import apiClient from '../lib/axios';

export const authApi = {
  login: (credentials) =>
    // apiClient.post('/account/login', credentials).then((r) => r.data),
    Promise.resolve({ data: {
      accessToken
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjg4ODQyODAwLCJleHAiOjE2ODg4NDY0MDB9.7n8sHqj3hLZtVh8lKZzjN8mXqkKZsWv7e3a9bXUjY',
      refreshToken
        : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjg4ODQyODAwLCJleHAiOjE2ODg5MjkyMDB9.7n8sHqj3hLZtVh8lKZzjN8mXqkKZsWv7e3a9bXUjY',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'demo@smatryx.com',
      },
    }}),

  logout: () =>
    // apiClient.post('/account/logout').then((r) => r.data),
    Promise.resolve(),

  refreshToken: (refresh_token) =>
    // apiClient.post('/account/refresh', { refresh_token }).then((r) => r.data),
    Promise.resolve(),
};
