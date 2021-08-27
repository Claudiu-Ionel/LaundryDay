import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import './DBMS.css';
import inputControl from '../../Functions/InputControl/InputControl';
require('dotenv').config({ path: '../../../.env' });

const Registration_DBMS = () => {
  // const [regButtonOn, setRegButtonOn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const formRef = useRef(null);

  const registerHandler = async (e) => {
    e.preventDefault();
    // const headers = new Headers();
    try {
      await Axios({
        method: 'post',
        url: `http://localhost:3001/registerAdmin`,
        data: {
          username: username,
          email: email,
          password: password,
        },
        // headers: headers,
      }).then((response) => {
        setUsername(null);
        setEmail(null);
        setPassword(null);

        const errNo = response.data?.code;

        if (response.data === 'Admin Registered') {
          setErrMsg('Admin Registered');
        }
        if (errNo === 'ER_DUP_ENTRY') {
          console.log(response);
          setErrMsg('Username already exists!');
        }
      });
    } catch (error) {
      console.error(error);
    }
    formRef.current.reset();
  };

  return (
    <form ref={formRef} onSubmit={(e) => registerHandler(e)} id="registration-form">
      <h2>Registration form</h2>
      <section className="reg-section">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="reg-username"
          required
          ref={userNameRef}
          onBlur={(e) => {
            e.target.style.outlineColor = 'rgb(59, 59, 59)';
          }}
          onChange={(e) => {
            inputControl(e, setUsername, userNameRef, setErrMsg);
          }}
        />
      </section>
      <section className="reg-section">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="reg-email"
          required
          ref={emailRef}
          onChange={(e) => {
            inputControl(e, setEmail, emailRef, setErrMsg);
          }}
          onBlur={(e) => {
            e.target.style.outlineColor = 'rgb(59, 59, 59)';
          }}
        />
      </section>
      <section className="reg-section">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="reg-password"
          required
          ref={passRef}
          onChange={(e) => {
            inputControl(e, setPassword, passRef, setErrMsg);
          }}
          onBlur={(e) => {
            e.target.style.outlineColor = 'rgb(59, 59, 59)';
          }}
        />
      </section>
      <button className="button blue">Register </button>
      <section className="reg-section">{errMsg}</section>
    </form>
  );
};

export default Registration_DBMS;
