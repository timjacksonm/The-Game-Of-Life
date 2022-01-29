import React from 'react';

const Button = ({ children, clickHanlder }) => {
  return <button onClick={clickHanlder}>{children}</button>;
};

export default Button;
