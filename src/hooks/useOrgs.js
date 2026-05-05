/**
 * Organizations — TanStack Query hooks
 * Cache profile: REFERENCE
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orgsApi } from '../api';
import { CACHE_PROFILES } from '../lib/queryClient';

export const orgKeys = {
  all: ['orgs'],
  list: (filters) => [...orgKeys.all, 'list', filters],
  detail: (id) => [...orgKeys.all, 'detail', id],
  hierarchy: [...['orgs'], 'hierarchy'],
};

export function useOrgs(params = {}) {
  return useQuery({
    queryKey: orgKeys.list(params),
    queryFn: () => orgsApi.getAll(params),
    ...CACHE_PROFILES.reference,
  });
}

export function useOrg(id) {
  return useQuery({
    queryKey: orgKeys.detail(id),
    queryFn: () => orgsApi.getById(id),
    enabled: Boolean(id),
    ...CACHE_PROFILES.reference,
  });
}

export function useOrgHierarchy() {
  return useQuery({
    queryKey: orgKeys.hierarchy,
    queryFn: orgsApi.getHierarchy,
    ...CACHE_PROFILES.reference,
  });
}

export function useCreateOrg() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orgsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: orgKeys.all }),
  });
}

export function useUpdateOrg() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => orgsApi.update(id, payload),
    onSuccess: (data, { id }) => {
      qc.setQueryData(orgKeys.detail(id), data);
      qc.invalidateQueries({ queryKey: orgKeys.list({}) });
    },
  });
}

export function useDeleteOrg() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orgsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: orgKeys.all }),
  });
}
