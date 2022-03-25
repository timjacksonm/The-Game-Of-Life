import React from 'react';

const Loading = () => {
  return (
    <div className="mx-auto my-3">
      <div
        style={{ borderTopColor: 'transparent' }}
        className={`animate-spin w-8 h-8 rounded-full border-solid border-4 border-current`}
      ></div>
    </div>
  );
};

export default Loading;
