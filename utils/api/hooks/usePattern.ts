import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pattern } from '@/types';
import { fetchWikiPatternById } from '..';

export const usePattern = (patternId: string) => {
  const [patternDetails, setPatternDetails] = useState<Pattern | null>(null);

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['pattern', patternId],
    queryFn: () =>
      fetchWikiPatternById(patternId, {
        select: JSON.stringify(['title', 'author', 'description', 'size', 'rleString']),
      }),
  });

  useEffect(() => {
    if (data) {
      setPatternDetails(data);
    }
  }, [data]);

  return {
    patternDetails,
    isLoading,
    isSuccess,
    error,
  };
};
