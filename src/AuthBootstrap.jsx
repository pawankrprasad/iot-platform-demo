import { useState, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, styles } from './context/ThemeContext';
import Sidebar from './layout/Sidebar';
import Login from '@features/account/pages/Login';
import ForgotPassword from '@features/account/pages/ForgotPassword';
import AccountLayout from './layout/AccountLayout';
import {
  bootstrapSuccess,
  bootstrapFailed,
  setBootstrapped,
  logoutAction,
  selectIsAuthenticated,
  selectIsBootstrapped,
} from './store';
import { Box, Text, Group, Menu, Avatar, Divider, Paper } from '@mantine/core';
import { BodyWrapper, AppLoader } from '@components';



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
