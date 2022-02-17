import React, { useState } from 'react';
import Settings from '../settings/settings';
import Details from '../details/details';
import Rules from '../rules/rules';
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
        className={`z-20 absolute ${position} flex flex-col w-1/3 bg-gray-800 transition-transform transform ${translate} duration-500 ease-in-out h-full`}
      >
        <Settings {...props} />
        <Details selected={selected} {...props} />
        {isOpen && <Patterns {...props} setSelected={setSelected} />}
      </div>
    );
  }

  if (name === 'Rules') {
    const translate = isOpen ? 'translate-x-0' : '-translate-x-full';
    const position = 'left-0';
    return (
      <div
        className={`z-20 absolute ${position} flex flex-col w-1/3 bg-gray-800 transition-transform transform ${translate} duration-500 ease-in-out h-full`}
      >
        <Rules />
      </div>
    );
  }
};

export default Sidenav;
