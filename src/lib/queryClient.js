/**
 * TanStack Query — Enterprise Client Configuration
 *
 * Caching strategy:
 *   staleTime  — how long data is considered fresh (no background refetch)
 *   gcTime     — how long inactive cache entries are kept in memory
 *
 * Defaults tuned for IoT dashboard (data changes frequently):
 *   - staleTime:  30 s  (data is fresh for 30 s after fetch)
 *   - gcTime:      5 min (unused entries evicted after 5 min)
 *   - retry:       2    (retry failed queries twice with exponential backoff)
 *   - refetchOnWindowFocus: true (re-validates when user returns to tab)
 */

import { QueryClient } from '@tanstack/react-query';

// Per-feature overrides — import and spread in individual queryOptions()
export const CACHE_PROFILES = {
  /** Live sensor / telemetry data — very short staleness */
  realtime: { staleTime: 5_000, gcTime: 60_000 },

  /** Frequently changing operational data (devices, alerts) */
  operational: { staleTime: 30_000, gcTime: 5 * 60_000 },

  /** Semi-static reference data (users, orgs, brands) */
  reference: { staleTime: 5 * 60_000, gcTime: 30 * 60_000 },

  /** Rarely changing config (roles, feature flags) */
  static: { staleTime: 30 * 60_000, gcTime: 60 * 60_000 },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...CACHE_PROFILES.operational,
      retry: (failureCount, error) => {
        // Do not retry on 4xx client errors (except 429 rate-limit)
        if (error?.status >= 400 && error?.status < 500 && error?.status !== 429) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        // Global mutation error handler — override per-mutation as needed
        console.error('[Mutation Error]', error?.message ?? error);
      },
    },
  },
});

export default queryClient;
