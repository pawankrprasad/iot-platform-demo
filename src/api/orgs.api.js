/**
 * Organizations API
 */

import apiClient from '../lib/axios';

const BASE = '/organizations';

export const orgsApi = {
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

  getHierarchy: () =>
    apiClient.get(`${BASE}/hierarchy`).then((r) => r.data),
};
