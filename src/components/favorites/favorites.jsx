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
      <ul className="flex flex-col">
        {favoriteList.map(({ text, key }) => (
          <div key={key}>
            <Copytext
              text={text}
              clipboard={clipboard}
              setClipboard={setClipboard}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
