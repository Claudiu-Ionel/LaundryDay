import { useState } from 'react';
import Axios from 'axios';
import './DBMS.css';
const Login_DBMS = () => {
  // const [regButtonOn, setRegButtonOn] = useState(false);
  const [logUsername, setLogUsername] = useState(null);
  const [logPassword, setLogPassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');

  const inputControl = (e, setState) => {
    let input = e.target.value;
    const conditions = [' ', ';', '+', '-', '='];
    const rejectionStatement = conditions.some((el) => input.includes(el));
    if (rejectionStatement) {
      e.target.value = null;
      setState(null);
      setErrMsg(`Please do not use: space, ';', '+', '-', '='`);
    } else {
      setState(input);
      setErrMsg(``);
    }
  };
  const clearInputValues = () => {
    const inputs = document.querySelectorAll('input');
    const inputsArray = [...inputs];
    inputsArray.map((input) => {
      return (input.value = null);
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('http://localhost:3001/login', {
        username: logUsername,
        password: logPassword,
      }).then((response) => {
        setErrMsg(response.data);
        setLogUsername(null);
        setLogPassword(null);
      });
    } catch (error) {
      console.log(error);
    }
    clearInputValues();
  };

  return (
    <form onSubmit={(e) => loginHandler(e)} id="login-form">
      <h2>ADMINS</h2>
      <section className="login-section">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="log-username"
          required
          onChange={(e) => {
            inputControl(e, setLogUsername);
          }}
        />
      </section>
      <section className="login-section">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="log-password"
          required
          onChange={(e) => {
            inputControl(e, setLogPassword);
          }}
        />
      </section>
      <button className="button">Login</button>
      <section className="reg-section">{errMsg}</section>
    </form>
  );
};

export default Login_DBMS;
