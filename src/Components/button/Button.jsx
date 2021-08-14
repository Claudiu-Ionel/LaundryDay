import React from 'react';
import './Button.css';
const Button = ({ text, eventHandler, className }) => {
  if (eventHandler) {
    return (
      <button className={className} onClick={(e) => eventHandler(e)}>
        {text}
      </button>
    );
  } else {
    return <button className={className}>{text}</button>;
  }
};

export default Button;
