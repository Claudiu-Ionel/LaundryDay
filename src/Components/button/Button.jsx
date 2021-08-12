import React from 'react';
import './Button.css';
const Button = ({ text, eventHandler, className }) => {
  return (
    <button className={className} onClick={(e) => eventHandler(e)}>
      {text}
    </button>
  );
};

export default Button;
