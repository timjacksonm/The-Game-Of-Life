import React, { useState } from 'react';
import './styles.css';
import Options from '../options/options';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const Header = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="header">
      {showOptions ? (
        <Options showOptions={showOptions} props={props} />
      ) : (
        <h1 className="title">The Game Of Life</h1>
      )}
      <p className="flexColumnCenter noMargin">
        {showOptions ? 'Hide options' : 'Show options'}
        {showOptions ? (
          <FaAngleUp
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        ) : (
          <FaAngleDown
            size="1.5em"
            onClick={() => setShowOptions(!showOptions)}
          />
        )}
      </p>
    </div>
  );
};

export default Header;
