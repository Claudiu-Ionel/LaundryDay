import React from 'react';
import './Dropdown_input.css';

const Dropdown_input = ({ placeholder, choiceList, state, setState, disabled }) => {
  if (disabled === true) {
    setState('');
  }
  return (
    <div className="input-wrapper">
      <input
        className="dropdown_input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        value={state}
        disabled={disabled}
      />
      <div className="choice-list">
        {choiceList?.map((item, index) => {
          return (
            <span
              onClick={(e) => setState(e.target.innerHTML)}
              key={item.name ? `${index}-${item.name}` : `${index}-${item.number}`}
            >
              {item.name ? item.name : item.number}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown_input;
