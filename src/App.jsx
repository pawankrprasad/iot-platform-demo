import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './AppRouter';
import  './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

