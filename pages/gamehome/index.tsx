import { useEffect, useState } from 'react';
import Game from './_game';
import { warmUpAPI } from '@/utils/api';

export default function GameHome() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    void warmUpAPI();
    setIsClient(true);
  }, []);

  if (!isClient) return <div>loading...</div>;

  return (
    <main>
      <Game />
    </main>
  );
}
