/**
 * Alerts — TanStack Query hooks
 * Cache profile: OPERATIONAL
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '../api';
import { CACHE_PROFILES } from '../lib/queryClient';

export const alertKeys = {
  all: ['alerts'],
  list: (filters) => [...alertKeys.all, 'list', filters],
  detail: (id) => [...alertKeys.all, 'detail', id],
  analytics: (params) => [...alertKeys.all, 'analytics', params],
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export function useAlerts(params = {}) {
  return useQuery({
    queryKey: alertKeys.list(params),
    queryFn: () => alertsApi.getAll(params),
    ...CACHE_PROFILES.operational,
  });
}

export function useAlert(id) {
  return useQuery({
    queryKey: alertKeys.detail(id),
    queryFn: () => alertsApi.getById(id),
    enabled: Boolean(id),
    ...CACHE_PROFILES.operational,
  });
}

export function useAlertAnalytics(params = {}) {
  return useQuery({
    queryKey: alertKeys.analytics(params),
    queryFn: () => alertsApi.getAnalytics(params),
    ...CACHE_PROFILES.operational,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export function useAcknowledgeAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: alertsApi.acknowledge,
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.all }),
  });
}

export function useResolveAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => alertsApi.resolve(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.all }),
  });
}

export function useBulkResolveAlerts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: alertsApi.bulkResolve,
    onSuccess: () => qc.invalidateQueries({ queryKey: alertKeys.all }),
  });
}
