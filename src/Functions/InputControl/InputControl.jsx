const inputControl = (e, setState, ref, setErrMsg) => {
  let input = ref.current;
  let inputValue = ref.current.value;
  const valueLength = ref.current.value.length;
  const conditions = [' ', ';', '+', '-', '=', '!', '`', '%'];
  const rejectionStatement = conditions.some((el) => inputValue.includes(el));
  if (rejectionStatement) {
    ref.current.value = null;
    input.style.outlineColor = 'red';
    setState(null);
    setErrMsg(`Please do not use: space, ';', '+', '-', '='`);
  } else if (valueLength === 0 || null) {
    input.style.outlineColor = 'rgb(59, 59, 59)';
  } else {
    setState(inputValue);
    input.style.outlineColor = 'rgb(59, 59, 59)';
    setErrMsg(``);
  }
};

export default inputControl;
