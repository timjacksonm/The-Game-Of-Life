import { useEffect, useState } from 'react';
import Game from './_game';
import { warmUpAPI } from '@/utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function GameHome() {
  const queryClient = new QueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    void warmUpAPI();
    setIsClient(true);
  }, []);

  if (!isClient) return <div>loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <Game />
    </QueryClientProvider>
  );
}
