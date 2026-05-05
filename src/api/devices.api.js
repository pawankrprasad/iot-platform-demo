/**
 * Devices API
 * All endpoints related to IoT devices / assets.
 * Each function returns the unwrapped response data.
 */

import apiClient from '../lib/axios';

const BASE = '/devices';

export const devicesApi = {
  /** List devices with optional filtering / pagination */
  getAll: (params) =>
    apiClient.get(BASE, { params }).then((r) => r.data),

  /** Single device by ID */
  getById: (id) =>
    apiClient.get(`${BASE}/${id}`).then((r) => r.data),

  /** Create a new device */
  create: (payload) =>
    apiClient.post(BASE, payload).then((r) => r.data),

  /** Full update */
  update: (id, payload) =>
    apiClient.put(`${BASE}/${id}`, payload).then((r) => r.data),

  /** Partial update */
  patch: (id, payload) =>
    apiClient.patch(`${BASE}/${id}`, payload).then((r) => r.data),

  /** Delete device */
  remove: (id) =>
    apiClient.delete(`${BASE}/${id}`).then((r) => r.data),

  /** Device telemetry / live data */
  getTelemetry: (id, params) =>
    apiClient.get(`${BASE}/${id}/telemetry`, { params }).then((r) => r.data),

  /** Bulk firmware update */
  bulkFirmwareUpdate: (payload) =>
    apiClient.post(`${BASE}/firmware/bulk`, payload).then((r) => r.data),
};
