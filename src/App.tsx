import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import { store } from './app/store';
import ProfileCard from '../src/components/profileCard'
import Container from './Container';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    
        <Provider store={store}>
          <Container />
        </Provider>

    </ThemeProvider>
  );
}

export default App;
