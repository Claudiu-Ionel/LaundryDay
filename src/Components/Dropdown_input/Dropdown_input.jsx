import { React, useEffect, useState } from 'react';
import { useGlobalState } from '../../App';
import './Dropdown_input.css';

const Dropdown_input = ({
  placeholder,
  choiceList,
  state,
  setState,
  disabled,
  previousSiblingData,
  objProp,
  setLastState,
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
    if (filteredList.length === 0) {
      setInputValue('');
    }
    if (previousSiblingData) {
      filter();
    }
    if (disabled) {
      setState(null);
      setInputValue('');
    }
    if (!state) {
      setInputValue('');
    }
    if (inputValue.length === 0) {
      setState(null);
    }
  }, [
    disabled,
    setState,
    choiceList,
    objProp,
    previousSiblingData,
    inputValue,
    filteredList.length,
    state,
  ]);

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
        {filteredList.length === 0 ? (
          <span>No Choices</span>
        ) : (
          filteredList?.map((item, index) => {
            return (
              <span
                onClick={(e) => {
                  if (setLastState) {
                    setLastState(item);
                  }
                  setState(item);
                  setInputValue(item.name ? item.name : item.number);
                }}
                key={item.name ? `${index}-${item.name}` : `${index}-${item.number}`}
              >
                {item.name ? item.name : item.number}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dropdown_input;
