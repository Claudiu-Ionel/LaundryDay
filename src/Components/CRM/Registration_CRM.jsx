import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import './CRM.css';
const Registration_CRM = () => {
  // const [regButtonOn, setRegButtonOn] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const regRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const inputControl = (e, setState, ref) => {
    let input = ref.current
    let inputValue = ref.current.value;
    const valueLength = ref.current.value.length
    const conditions = [' ', ';', '+', '-', '='];
    const rejectionStatement = conditions.some((el) => inputValue.includes(el));
    
    if (rejectionStatement) {
      ref.current.value = null;
      input.style.outlineColor = "red"
      setState(null);
      setErrMsg(`Please do not use: space, ';', '+', '-', '='`);
    } else if (valueLength === 0 || null) {
      input.style.outlineColor = "rgb(59, 59, 59)"
    } else {
      setState(inputValue);
      input.style.outlineColor = "rgb(52, 235, 82)"
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

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      await Axios.post('http://localhost:3001/register', {
        username: username,
        email: email,
        password: password,
      }).then((response) => {
        setUsername(null);
        setEmail(null);
        setPassword(null);

        const errNo = response.data?.errno;

        if (response.data === 'User registered') {
          setErrMsg('User Registered');
        }
        if (errNo === 1062) {
          setErrMsg('Username already exists');
        }
        if (errNo === 1048) {
          setErrMsg('Please fill all the inputs fields');
        }
      });
    } catch (error) {
      console.log(error);
    }
    clearInputValues();
  };

  useEffect(() => {
    console.log("useEffect");
  }, [])

  return (
    <form onSubmit={(e) => registerHandler(e)} id="registration-form">
      <h2>Registration form</h2>
      <section className="reg-section">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="reg-username"
          required
          ref={regRef}
          onChange={(e) => {
            inputControl(e, setUsername, regRef);
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
            inputControl(e, setEmail, emailRef);
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
            inputControl(e, setPassword, passRef);
          }}
        />
      </section>
      <button className="button">Register </button>
      <section className="reg-section">{errMsg}</section>
    </form>
  );
};

export default Registration_CRM;
