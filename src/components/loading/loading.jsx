import React from 'react';

const Loading = ({ borderColor }) => {
  return (
    <div>
      <div
        style={{ borderTopColor: 'transparent' }}
        className={`animate-spin w-8 h-8 rounded-full border-solid border-4 ${borderColor}  `}
      ></div>
    </div>
  );
};

export default Loading;
