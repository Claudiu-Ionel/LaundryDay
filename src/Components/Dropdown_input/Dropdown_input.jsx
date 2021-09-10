import { React, useEffect, useState } from 'react';
import './Dropdown_input.css';

const Dropdown_input = ({
  placeholder,
  choiceList,
  state,
  setState,
  setStateId,
  disabled,
  reset,
  previousSiblingData,
  objProp,
}) => {
  const [filteredList, setFilteredList] = useState(choiceList);
  const [inputValue, setInputValue] = useState('');
  const filterChoiceList = (e) => {
    setFilteredList(
      choiceList.filter((item) => {
        if (item.name) {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        } else if (item.number) {
          return item.number.toString().includes(e.target.value);
        }
      }),
    );
  };

  useEffect(() => {
    const filter = () => {
      setFilteredList(
        choiceList.filter((li) => {
          return li[objProp] === previousSiblingData.id;
        }),
      );
    };
    if (previousSiblingData) {
      filter();
    }
    if (disabled) {
      setState('');
    }
  }, [disabled, setState, choiceList, objProp, previousSiblingData]);

  return (
    <div className="input-wrapper">
      <input
        className="dropdown_input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          filterChoiceList(e);
        }}
        value={inputValue}
        disabled={disabled}
      />
      <div className="choice-list">
        {filteredList?.map((item, index) => {
          return (
            <span
              onClick={(e) => {
                setState(item);
                setInputValue(item.name ? item.name : item.number);
              }}
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
