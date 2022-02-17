import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../loading/loading';
import Button from '../button/button';
import { GiPalette } from 'react-icons/gi';
import { useGetWikiPatternByIdQuery } from '../../services/gameoflifeapi';

const PatternInfo = (props) => {
  const { selected, setBrush, grid, setLiveCoords } = props;
  const { data, isFetching } = useGetWikiPatternByIdQuery(selected.id);

  function applyBrushHandler() {
    setBrush(data.rleString);
  }

  function removeBrushHandler() {
    setBrush();
    setLiveCoords(() => new Set());
  }

  if (isFetching)
    return (
      <div className="h-1/3 flex p-3 min-h-full justify-center">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="flex">
        <Button name="Remove Pattern" clickHanlder={removeBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
        <Button name="Apply Pattern" clickHanlder={applyBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
      </div>
      <div className="py-3">
        <h2>Title: {data.title}</h2>
        <h2>Author: {data.author}</h2>
        <h2>Width: {data.size.x}</h2>
        <h2>Height: {data.size.y}</h2>
        <h3>
          Description:{' '}
          {data.description.map((string) => {
            if (
              string.substring(0, 4) === 'http' ||
              string.substring(0, 4) === 'www.'
            ) {
              return (
                <a
                  key={uuidv4()}
                  href={string}
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-400 hover:text-blue-800"
                >
                  <p>{string}</p>
                </a>
              );
            } else {
              return <p key={uuidv4()}>{string}</p>;
            }
          })}
        </h3>
      </div>
    </>
  );
};

const Details = (props) => {
  const { selected } = props;
  return (
    <div className="h-2/5 flex flex-col items-center p-3">
      <h1 className="font-bold">Details</h1>
      <div className="bg-gray-600 w-full h-full p-3 overflow-y-auto">
        <div className="flex flex-col py-3">
          {selected ? (
            <PatternInfo {...props} />
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
