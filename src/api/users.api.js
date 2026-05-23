/**
 * Users API
 */

import apiClient from '../lib/axios';

const BASE = '/users';

export const usersApi = {
  getAll: (params) =>
    apiClient.get(BASE, { params }).then((r) => r.data),

  getById: (id) =>
    apiClient.get(`${BASE}/${id}`).then((r) => r.data),

  create: (payload) =>
    apiClient.post(BASE, payload).then((r) => r.data),

  update: (id, payload) =>
    apiClient.put(`${BASE}/${id}`, payload).then((r) => r.data),

  remove: (id) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  updateRole: (id, roleId) =>
    apiClient.patch(`${BASE}/${id}/role`, { roleId }).then((r) => r.data),

  getProfile: () =>
    // apiClient.get(`${BASE}/me`).then((r) => r.data),
    Promise.resolve({
      id: '1',
      name: 'John Doe',
      email: 'demo@smatryx.com',
    }),
};
