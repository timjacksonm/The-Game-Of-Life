import dynamic from 'next/dynamic';

const DynamicGame = dynamic(() => import('./_game'), {
  ssr: false,
});

export default function GameHome() {
  return <DynamicGame />;
}
