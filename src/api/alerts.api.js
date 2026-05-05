/**
 * Alerts API
 */

import apiClient from '../lib/axios';

const BASE = '/alerts';

export const alertsApi = {
  getAll: (params) =>
    apiClient.get(BASE, { params }).then((r) => r.data),

  getById: (id) =>
    apiClient.get(`${BASE}/${id}`).then((r) => r.data),

  acknowledge: (id) =>
    apiClient.post(`${BASE}/${id}/acknowledge`).then((r) => r.data),

  resolve: (id, payload) =>
    apiClient.post(`${BASE}/${id}/resolve`, payload).then((r) => r.data),

  bulkResolve: (ids) =>
    apiClient.post(`${BASE}/bulk-resolve`, { ids }).then((r) => r.data),

  getAnalytics: (params) =>
    apiClient.get(`${BASE}/analytics`, { params }).then((r) => r.data),
};
