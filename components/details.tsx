import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../loading/loading';
import Button from '../button/button';
import { GiPalette } from 'react-icons/gi';

const WikiPatternInfo = ({ selected, setBrush, removeBrushHandler, brush }) => {
  // const { data, isFetching } = useGetWikiPatternByIdQuery(
  //   selected.wikiCollection.id
  // );

  function applyBrushHandler() {
    setBrush(data.rleString);
  }

  if (isFetching)
    return (
      <div className='mx-auto'>
        <Loading />
      </div>
    );

  return (
    <>
      <div className='flex h-1/5 border-y-2 border-gray-400'>
        <Button
          name='Remove Pattern'
          clickHanlder={removeBrushHandler}
          disabled={brush.length ? false : true}
        >
          <GiPalette title='Palette' size='2em' />
        </Button>
        <Button name='Apply Pattern' clickHanlder={applyBrushHandler}>
          <GiPalette title='Palette' size='2em' />
        </Button>
      </div>
      <div className='zoom75:py-6 zoom50:py-9 zoom25:py-12 px-3 py-3'>
        <h2>Title: {data.title}</h2>
        <h2>Author: {data.author}</h2>
        <h2>Width: {data.size.x}</h2>
        <h2>Height: {data.size.y}</h2>
        <h3>
          Description:{' '}
          {data.description.map((string) => {
            if (string.substring(0, 4) === 'http' || string.substring(0, 4) === 'www.') {
              return (
                <a
                  key={uuidv4()}
                  href={string}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-400 underline hover:text-blue-800'
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

const CustomPatternInfo = ({ selected, setBrush, removeBrushHandler, brush }) => {
  const { data, isFetching } = useGetCustomPatternByIdQuery(selected.customCollection.id);

  function applyBrushHandler() {
    setBrush(data.rleString);
  }

  if (isFetching)
    return (
      <div className='mx-auto'>
        <Loading />
      </div>
    );

  return (
    <>
      <div className='flex h-1/5 border-y-2 border-gray-400'>
        <Button
          name='Remove Pattern'
          clickHanlder={removeBrushHandler}
          disabled={brush.length ? false : true}
        >
          <GiPalette title='Palette' size='2em' />
        </Button>
        <Button name='Apply Pattern' clickHanlder={applyBrushHandler}>
          <GiPalette title='Palette' size='2em' />
        </Button>
      </div>
      <div className='zoom75:py-6 zoom50:py-9 zoom25:py-12 px-3 py-3'>
        <h2>Title: {data.title}</h2>
        <h2>Author: {data.author}</h2>
        <h2>Width: {data.size.x}</h2>
        <h2>Height: {data.size.y}</h2>
        <h3>
          Description:{' '}
          {data.description.map((string) => {
            if (string.substring(0, 4) === 'http' || string.substring(0, 4) === 'www.') {
              return (
                <a
                  key={uuidv4()}
                  href={string}
                  target='_blank'
                  rel='noreferrer'
                  className='text-blue-400 underline hover:text-blue-800'
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
  const { selected, setBrush, setLiveCoords, brush } = props;
  function removeBrushHandler() {
    setBrush([]);
    setLiveCoords(() => new Set());
  }

  return (
    <div className='zoom50:p-6 zoom25:p-9 flex h-2/5 flex-col items-center p-3'>
      <h1 className='font-bold'>Details</h1>
      <div className='h-full w-full overflow-y-auto bg-gray-600'>
        <div className='flex h-full flex-col'>
          {selected.wikiCollection && (
            <WikiPatternInfo {...props} removeBrushHandler={removeBrushHandler} />
          )}
          {selected.customCollection && (
            <CustomPatternInfo {...props} removeBrushHandler={removeBrushHandler} />
          )}
          {!selected.wikiCollection && !selected.customCollection && (
            <>
              <div className='flex h-1/5 border-y-2 border-gray-400'>
                <Button
                  name='Remove Pattern'
                  clickHanlder={removeBrushHandler}
                  disabled={brush.length ? false : true}
                >
                  <GiPalette title='Palette' size='2em' />
                </Button>
                <Button name='Apply Pattern' disabled>
                  <GiPalette title='Palette' size='2em' />
                </Button>
              </div>
              <div className='zoom75:py-6 zoom50:py-9 zoom25:py-12 px-3 py-3'>
                <h2>Title: </h2>
                <h2>Author: </h2>
                <h3>Description: </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
