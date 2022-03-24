import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../loading/loading';
import Button from '../button/button';
import { GiPalette } from 'react-icons/gi';
import {
  useGetWikiPatternByIdQuery,
  useGetCustomPatternByIdQuery,
} from '../../services/gameoflifeapi';

const WikiPatternInfo = (props) => {
  const { selected, setBrush, setLiveCoords } = props;
  const { data, isFetching } = useGetWikiPatternByIdQuery(
    selected.wikiCollection.id
  );

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
      <div className="flex h-1/5 border-y-2 border-gray-400">
        <Button name="Remove Pattern" clickHanlder={removeBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
        <Button name="Apply Pattern" clickHanlder={applyBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
      </div>
      <div className="px-3 py-3 zoom75:py-6 zoom50:py-9 zoom25:py-12">
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

const CustomPatternInfo = (props) => {
  const { selected, setBrush, setLiveCoords } = props;
  const { data, isFetching } = useGetCustomPatternByIdQuery(
    selected.customCollection.id
  );

  function applyBrushHandler() {
    console.log(data.rleString);
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
      <div className="flex h-1/5 border-y-2 border-gray-400">
        <Button name="Remove Pattern" clickHanlder={removeBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
        <Button name="Apply Pattern" clickHanlder={applyBrushHandler}>
          <GiPalette title="Palette" size="2em" />
        </Button>
      </div>
      <div className="px-3 py-3 zoom75:py-6 zoom50:py-9 zoom25:py-12">
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
    <div className="h-2/5 flex flex-col items-center p-3 zoom50:p-6 zoom25:p-9">
      <h1 className="font-bold">Details</h1>
      <div className="bg-gray-600 w-full h-full overflow-y-auto">
        <div className="flex flex-col h-full">
          {selected.wikiCollection && <WikiPatternInfo {...props} />}
          {selected.customCollection && <CustomPatternInfo {...props} />}
          {!selected.wikiCollection && !selected.customCollection && (
            <div className="px-3 py-3 zoom75:py-6 zoom50:py-9 zoom25:py-12">
              <h2>Title: </h2>
              <h2>Author: </h2>
              <h3>Description: </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
