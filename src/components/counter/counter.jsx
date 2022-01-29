import React, { useState, useEffect } from 'react';

const Counter = ({ title, state }) => {
  return (
    <div className=" py-2 px-4 inline-flex items-center">
      {title}: {state}
    </div>
  );
};

export default Counter;
