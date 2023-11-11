import { usePattern } from '@/utils/api/hooks/usePattern';
import { GiPalette } from 'react-icons/gi';
import LoadingIcon from './loader';
import Button from './button';
import { useContext } from 'react';
import { GameContext } from '@/pages/gamehome/_game';
import { decode } from '@/utils/decdoe';

interface PatternDetailsProps {
  selectedPatternId: string;
}

const PatternDetails = ({ selectedPatternId }: PatternDetailsProps) => {
  const { patternDetails, isLoading, error } = usePattern(selectedPatternId);
  const { applyPatternToBrush, removePatternFromBrush } = useContext(GameContext);

  const handleClickApply = () => {
    if (!patternDetails) return;

    if (patternDetails.rleString && patternDetails.size) {
      const decodedString = decode(patternDetails.rleString, patternDetails.size);
      applyPatternToBrush(decodedString);
    }
  };

  const handleClickRemove = () => {
    removePatternFromBrush();
  };

  // function removeBrushHandler() {
  //   setBrush([]);
  //   setLiveCoords(() => new Set());
  // }

  const renderContent = () => {
    if (error) {
      return <div>Error fetching pattern data</div>;
    }

    if (isLoading) {
      return <LoadingIcon />;
    }

    return (
      <div className='p-3'>
        <h2>Title: {patternDetails?.title}</h2>
        <h2>Author: {patternDetails?.author}</h2>
        <h2>Width: {patternDetails?.size?.x}</h2>
        <h2>Height: {patternDetails?.size?.y}</h2>
        <h3>
          Description:{' '}
          {patternDetails?.description?.map((text: string, index: number) => {
            if (text.substring(0, 4) === 'http' || text.substring(0, 4) === 'www.') {
              return (
                <a
                  href={text}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-400 underline hover:text-blue-800'
                  key={index}
                >
                  <p>{text}</p>
                </a>
              );
            } else {
              return <p key={index}>{text}</p>;
            }
          })}
        </h3>
      </div>
    );
  };

  return (
    <>
      <div className='flex h-1/5 border-y-2 border-gray-400'>
        <Button clickHanlder={handleClickRemove} name='Remove Pattern'>
          <GiPalette title='Palette' size='2em' />
        </Button>
        <Button clickHanlder={handleClickApply} name='Apply Pattern'>
          <GiPalette title='Palette' size='2em' />
        </Button>
      </div>
      {renderContent()}
    </>
  );
};

export default PatternDetails;
