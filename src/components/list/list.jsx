import React from 'react';
import Loading from '../loading/loading';
import { useGetPatternNamesQuery } from '../../services/gameoflifeapi';

const List = () => {
  const { data, isFetching } = useGetPatternNamesQuery();

  if (isFetching) return <Loading />;

  return (
    <div className="flex flex-col items-center p-3 flex-1 scroll bg-green-400">
      {'loaded'}
    </div>
  );
};

export default List;
