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
  filterOption,
}) => {
  const [filteredList, setFilteredList] = useState(choiceList);
  const [inputFilterList, setInputFilterList] = useState(filteredList);
  const [inputValue, setInputValue] = useState('');
  const filterChoiceList = (e) => {
    console.log(e.target.value);
    setInputFilterList(
      filteredList.filter((item) => {
        return item[filterOption].toString().toLowerCase().includes(e.target.value.toLowerCase());
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
      setState(null);
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
  console.log(inputValue);
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
          inputFilterList?.map((item, index) => {
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
