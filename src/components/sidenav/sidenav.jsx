import React, { useState } from 'react';
import Settings from '../settings/settings';
import Details from '../details/details';
import Guide from '../guide/guide';
import Patterns from '../patterns/patterns';

const Sidenav = (props) => {
  const { isOpen, name } = props;
  const [selected, setSelected] = useState({
    wikiCollection: null,
    customCollection: null,
  });

  if (name === 'Settings') {
    const translate = isOpen ? 'translate-x-0' : 'translate-x-full';
    const position = 'right-0';
    return (
      <div
        className={`z-20 absolute ${position} flex flex-col w-1/3 bg-gray-800 transition-transform transform ${translate} duration-500 ease-in-out h-full zoom80:text-xl zoom67:text-2xl zoom50:text-3xl zoom33:text-5xl zoom25:text-6xl`}
      >
        <Settings {...props} />
        <Details selected={selected} {...props} />
        {isOpen && (
          <Patterns {...props} setSelected={setSelected} selected={selected} />
        )}
      </div>
    );
  }

  if (name === 'Guide') {
    const translate = isOpen ? 'translate-x-0' : '-translate-x-full';
    const position = 'left-0';
    return (
      <div
        className={`z-20 absolute ${position} flex flex-col w-1/3 bg-gray-800 transition-transform transform ${translate} duration-500 ease-in-out h-full zoom90:text-xl zoom80:text-2xl zoom50:text-4xl zoom33:text-5xl zoom25:text-7xl`}
      >
        <Guide {...props} />
      </div>
    );
  }
};

export default Sidenav;
