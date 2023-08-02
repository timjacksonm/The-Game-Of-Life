import { warmUpAPI } from '@/utils/api';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    void warmUpAPI();
  }, []);
  return (
    <main>
      <Link href='/gamehome'>Start Simulation</Link>
    </main>
  );
}
