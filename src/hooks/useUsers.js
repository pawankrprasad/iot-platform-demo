/**
 * Users — TanStack Query hooks
 * Cache profile: REFERENCE (semi-static)
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api';
import { CACHE_PROFILES } from '../lib/queryClient';

export const userKeys = {
  all: ['users'],
  list: (filters) => [...userKeys.all, 'list', filters],
  detail: (id) => [...userKeys.all, 'detail', id],
  profile: ['me'],
};

export function useUsers(params = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => usersApi.getAll(params),
    ...CACHE_PROFILES.reference,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: Boolean(id),
    ...CACHE_PROFILES.reference,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: userKeys.profile,
    queryFn: usersApi.getProfile,
    ...CACHE_PROFILES.reference,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => usersApi.update(id, payload),
    onSuccess: (data, { id }) => {
      qc.setQueryData(userKeys.detail(id), data);
      qc.invalidateQueries({ queryKey: userKeys.list({}) });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: usersApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
}
