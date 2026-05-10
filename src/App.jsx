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

import { createTheme, MantineProvider } from '@mantine/core';
const theme = createTheme({
  colors: {
    default: [
      "#e1f8ff",
      "#cbedff",
      "#9ad7ff",
      "#64c1ff",
      "#3aaefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0079cd",
      "#0068b6"
    ],
    dark: [
      '#C1C2C5', // 0: Text
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1E2535', // 7: Body Background (Change this!)
      '#141517',
      '#101113',
    ],
  },
  primaryColor: 'default',
  components: {
    Input: {
      styles: {
        input: { backgroundColor: 'var(--mantine-color-dark-9)' },
      },
    },

    InputWrapper: {
      styles: {
        label: { 
          fontSize: 12,
          color: 'var(--mantine-color-dark-2)',
          display: 'block',
          marginBottom: 4 
        },
      },
    },
    Select: {
      styles: {
        input: { backgroundColor: 'var(--mantine-color-dark-9)' },
      },
    }
  },
});

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

