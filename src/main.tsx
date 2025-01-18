import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

export const initAPIMock = async () => {
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
      <App />
    </React.StrictMode>
  );
};

initApplication();
