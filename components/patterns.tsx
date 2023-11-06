import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllWikiPatterns } from '@/utils/api';
import DropdownCombobox from './dropdowncombobox';

const Patterns = (props) => {
  const [patternOptions, setPatternOptions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ['patterns'], // dunno what this does
    queryFn: () =>
      fetchAllWikiPatterns({ limit: 2300, select: JSON.stringify(['title', 'author']) }),
  });

  if (isLoading) <div>Loading...</div>;

  if (error) <div>Error fetching data</div>;
  console.log(data, 'parent dat');
  useEffect(() => {
    if (data?.totalCount) setTotalCount(data.totalCount);
    if (data?.results) setPatternOptions(data.results);
  }, [data]);

  return (
    <div className='p-2'>
      <h2 className='my-2'>{`Showing ${patternOptions.length} available patterns.`}</h2>

      {data?.results.length && <DropdownCombobox data={data} />}
    </div>
  );
};

export default Patterns;
