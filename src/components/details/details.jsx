import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../loading/loading';
import Button from '../button/button';
import { GiPalette } from 'react-icons/gi';
import { useGetPatternByIdQuery } from '../../services/gameoflifeapi';

const PatternInfo = ({ id }) => {
  const { data, isFetching } = useGetPatternByIdQuery(id);

  if (isFetching)
    return (
      <div className="h-1/3 flex flex-col items-center p-3 min-h-full">
        <Loading />
      </div>
    );

  return (
    <>
      <h2>Title: {data.title}</h2>
      <h2>Author: {data.author}</h2>
      <h3>
        Description:{' '}
        {data.description.map((string) => (
          <p key={uuidv4()}>{string}</p>
        ))}
      </h3>
    </>
  );
};

const Details = ({ selected }) => {
  return (
    <div className="h-2/5 flex flex-col items-center p-3">
      <h1 className="font-bold">Details</h1>
      <div className="bg-gray-600 w-full h-full p-3 overflow-y-auto">
        <div className="flex flex-col py-3">
          {selected ? (
            <>
              <Button
                name="Apply Pattern"
                clickHanlder={() => console.log(selected.id)}
              >
                <GiPalette title="Palette" size="2em" />
              </Button>
              <PatternInfo id={selected.id} />
            </>
          ) : (
            <>
              <h2>Title: </h2>
              <h2>Author: </h2>
              <h3>Description: </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
