import { Navigate, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage, MapPage } from '@pages';
import { useSessionStore } from '@stores/use-user-store';

const queryClient = new QueryClient();

export const App = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated());
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/map" element={isAuthenticated ? <MapPage /> : <Navigate to="/" />} />
      </Routes>
    </QueryClientProvider>
  );
};
