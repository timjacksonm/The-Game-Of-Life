import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllWikiPatterns } from '@/utils/api';
import Combobox from './combobox';
import { Pattern } from '@/types';

const Patterns = () => {
  const [patternOptions, setPatternOptions] = useState<Pattern[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['patterns'],
    queryFn: () =>
      fetchAllWikiPatterns({ limit: 2300, select: JSON.stringify(['title', 'author']) }),
  });

  useEffect(() => {
    if (data && 'results' in data) {
      setTotalCount(data.totalCount);
      setPatternOptions(data.results);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className='p-2'>
      <h1>{`Total available patterns: ${totalCount}`}</h1>
      {isSuccess && patternOptions.length && <Combobox patternOptions={patternOptions} />}
    </div>
  );
};

export default Patterns;
