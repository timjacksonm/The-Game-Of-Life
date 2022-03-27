import React, { useState } from 'react';
import Copytext from '../copytext/copytext';

function Favorites() {
  const [clipboard, setClipboard] = useState(null);
  const favoriteList = [
    {
      text: 'oscillator no name',
      key: 0,
    },
    {
      text: 'oscillator no name #2',
      key: 1,
    },
    {
      text: 'oscillator no name #3',
      key: 2,
    },
    {
      text: 'Spacefiller 1',
      key: 3,
    },
    {
      text: 'Spacefiller 2',
      key: 4,
    },
    {
      text: 'Ship maker',
      key: 5,
    },
    {
      text: 'Pufferfish',
      key: 6,
    },
    {
      text: 'Pufferfish spaceship',
      key: 7,
    },
    {
      text: 'Frothing puffer',
      key: 8,
    },
    {
      text: 'Star',
      key: 9,
    },
    {
      text: 'Electric fence',
      key: 10,
    },
    {
      text: 'Hammerhead',
      key: 11,
    },
    {
      text: 'Alternate pi orbital',
      key: 12,
    },
    {
      text: '56P27',
      key: 13,
    },
    {
      text: '132P37',
      key: 14,
    },
    {
      text: '124P37',
      key: 15,
    },
  ];
  return (
    <div className="p-3">
      <p>
        WikiCollection has over 2,000 patterns. In the settings navigation you
        can search for a pattern. To highlight some of my favorites here is a
        list!
      </p>
      <p>
        Just click the name to copy the text. Than paste in the search field.
      </p>
      <ol className="flex flex-col list-decimal p-3">
        {favoriteList.map(({ text, key }) => (
          <li key={key}>
            <Copytext
              text={text}
              clipboard={clipboard}
              setClipboard={setClipboard}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Favorites;
