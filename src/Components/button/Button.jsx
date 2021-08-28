import React from 'react';
import './Button.css';
const Button = ({ text, eventHandler, className, onMouseEnter, onMouseLeave }) => {
  const cancelFunc = () => {
    return;
  };

  return (
    <button
      className={className}
      onClick={eventHandler ? (e) => eventHandler(e) : () => cancelFunc}
      onMouseEnter={onMouseEnter ? (e) => onMouseEnter(e) : () => cancelFunc}
      onMouseLeave={onMouseLeave ? (e) => onMouseLeave(e) : () => cancelFunc}
    >
      {text}
    </button>
  );
};

export default Button;
