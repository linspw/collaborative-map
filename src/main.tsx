import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from './plugins/mui-theme.ts';

export const initAPIMock = async () => {
  // @ts-expect-error Import need to be augumented
  const { worker } = await import('./server/worker.js');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
};

const initApplication = async () => {
  await initAPIMock();
  const rootRef = document.getElementById('root');

  ReactDOM.createRoot(rootRef!).render(
    <React.StrictMode>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

initApplication();
