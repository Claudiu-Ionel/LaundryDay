import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../App';
import Axios from 'axios';
import inputControl from '../../Functions/InputControl/InputControl';
import './DBMS.css';
const Login_DBMS = () => {
  const history = useHistory();
  const globalState = useGlobalState();
  const setAdmin = globalState.setAdmin;
  const [logUsername, setLogUsername] = useState(null);
  const [logPassword, setLogPassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const userNameRef = useRef(null);
  const passRef = useRef(null);
  const formRef = useRef(null);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const request = await Axios({
        method: 'post',
        url: 'http://localhost:3001/loginAdmin',
        data: {
          username: logUsername,
          password: logPassword,
        },
      });
      const requestData = request?.data;
      const dataObj = request?.data[0];
      if (requestData.length > 0 && 'id' in dataObj) {
        setAdmin({ id: dataObj.id, username: dataObj.username });
        formRef.current.reset();
        history.push('/DBMS');
      } else {
        formRef.current.reset();
        setErrMsg('username/password wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form ref={formRef} onSubmit={(e) => loginHandler(e)} id="login-form">
      <h2>ADMINS</h2>
      <section className="login-section">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="log-username"
          ref={userNameRef}
          required
          onBlur={(e) => {
            e.target.style.outlineColor = 'rgb(59, 59, 59)';
          }}
          onChange={(e) => {
            inputControl(e, setLogUsername, userNameRef, setErrMsg);
          }}
        />
      </section>
      <section className="login-section">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="log-password"
          ref={passRef}
          required
          onBlur={(e) => {
            e.target.style.outlineColor = 'rgb(59, 59, 59)';
          }}
          onChange={(e) => {
            inputControl(e, setLogPassword, passRef, setErrMsg);
          }}
        />
      </section>
      <button className="button">Login</button>
      <section className="reg-section">{errMsg}</section>
    </form>
  );
};

export default Login_DBMS;
