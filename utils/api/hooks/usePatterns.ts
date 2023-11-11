import { useEffect, useState } from 'react';
import { fetchAllWikiPatterns } from '..';
import { useQuery } from '@tanstack/react-query';
import { Pattern } from '@/types';

export const usePatterns = () => {
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

  return {
    patternOptions,
    totalCount,
    isLoading,
    isSuccess,
    error,
  };
};
