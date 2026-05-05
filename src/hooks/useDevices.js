/**
 * Devices — TanStack Query hooks
 *
 * Cache profile: OPERATIONAL (staleTime 30 s, gcTime 5 min)
 * Telemetry uses REALTIME (staleTime 5 s, auto-refetch every 10 s)
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { devicesApi } from '../api';
import { CACHE_PROFILES } from '../lib/queryClient';

// Query key factory — keeps keys co-located and consistent
export const deviceKeys = {
  all: ['devices'],
  list: (filters) => [...deviceKeys.all, 'list', filters],
  detail: (id) => [...deviceKeys.all, 'detail', id],
  telemetry: (id) => [...deviceKeys.all, 'telemetry', id],
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** List all devices with optional filters/pagination */
export function useDevices(params = {}) {
  return useQuery({
    queryKey: deviceKeys.list(params),
    queryFn: () => devicesApi.getAll(params),
    placeholderData: keepPreviousData, // smooth pagination
    ...CACHE_PROFILES.operational,
  });
}

/** Single device */
export function useDevice(id) {
  return useQuery({
    queryKey: deviceKeys.detail(id),
    queryFn: () => devicesApi.getById(id),
    enabled: Boolean(id),
    ...CACHE_PROFILES.operational,
  });
}

/** Live telemetry — short staleness + auto-refetch every 10 s */
export function useDeviceTelemetry(id, params) {
  return useQuery({
    queryKey: deviceKeys.telemetry(id),
    queryFn: () => devicesApi.getTelemetry(id, params),
    enabled: Boolean(id),
    refetchInterval: 10_000,
    ...CACHE_PROFILES.realtime,
  });
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export function useCreateDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: devicesApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: deviceKeys.all }),
  });
}

export function useUpdateDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => devicesApi.update(id, payload),
    onSuccess: (data, { id }) => {
      // Update cache in-place + invalidate list
      qc.setQueryData(deviceKeys.detail(id), data);
      qc.invalidateQueries({ queryKey: deviceKeys.list({}) });
    },
  });
}

export function useDeleteDevice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: devicesApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: deviceKeys.all }),
  });
}

export function useBulkFirmwareUpdate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: devicesApi.bulkFirmwareUpdate,
    onSuccess: () => qc.invalidateQueries({ queryKey: deviceKeys.all }),
  });
}
