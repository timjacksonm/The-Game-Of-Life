import { usePattern } from '@/utils/api/hooks/usePattern';
import LoadingIcon from './loader';
import { useEffect } from 'react';

import { decode } from '@/utils/decdoe';

interface PatternDetailsProps {
  selectedPatternId: string;
  setDecodedPattern: (decodedPattern: number[][] | null) => void;
}

const PatternDetails = ({ selectedPatternId, setDecodedPattern }: PatternDetailsProps) => {
  const { patternDetails, isLoading, error } = usePattern(selectedPatternId);

  useEffect(() => {
    if (patternDetails?.rleString && patternDetails?.size) {
      const decodedString = decode(patternDetails.rleString, patternDetails.size);
      setDecodedPattern(decodedString);
    }
  }, [patternDetails, setDecodedPattern]);

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

  return renderContent();
};

export default PatternDetails;
