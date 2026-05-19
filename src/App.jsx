import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './AppRouter';
import { store } from './store';
import queryClient from './lib/queryClient';
import './App.css';
import '@mantine/core/styles.css';
import 'mantine-datatable/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';






export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <AppRouter />
          </MantineProvider>
        </ThemeProvider>
        {/* DevTools panel — only rendered in development builds */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

