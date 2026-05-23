import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  bootstrapSuccess,
  bootstrapFailed,
  setBootstrapped,
  selectIsBootstrapped,
} from './store';



export function AuthBootstrap() {
  const dispatch = useDispatch();
  const bootstrapped = useSelector(selectIsBootstrapped);

  useEffect(() => {
    if (bootstrapped) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      dispatch(setBootstrapped());
      return;
    }

    // Validate stored token by calling GET /me
    import('./api/users.api').then(({ usersApi }) => {
      usersApi.getProfile()
        .then((user) => dispatch(bootstrapSuccess(user)))
        .catch((err) => {
          if (err?.status === 401) {
            dispatch(bootstrapFailed());
          } else {
            // Network/server error — keep existing auth state optimistically
            dispatch(setBootstrapped());
          }
        });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
