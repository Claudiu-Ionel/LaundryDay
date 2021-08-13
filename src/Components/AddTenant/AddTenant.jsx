import { useState, useRef } from 'react';
import inputControl from '../../Functions/InputControl/InputControl';
import Button from '../button/Button';

const AddTenant = () => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [apartmentNr, setApartmentNr] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const firstNameRef = useRef(null);
  const LastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const tenantToAdd = {
    firstName,
    LastName,
    apartmentNr,
    userName,
    email,
    password,
  };
  const addTenant = (e) => {
    e.preventDefault();
    console.log(tenantToAdd);
  };
  return (
    <form onSubmit={(e) => addTenant(e)} id="registration-form">
      <h2>Add Tenant</h2>
      <section className="reg-section">
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          name="firstName"
          id="reg-firstName"
          required
          ref={firstNameRef}
          onChange={(e) => inputControl(e, setFirstName, firstNameRef, setErrMsg)}
        />
      </section>
      <section className="reg-section">
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="lastName"
          id="reg-lastName"
          required
          ref={LastNameRef}
          onChange={(e) => inputControl(e, setLastName, LastNameRef, setErrMsg)}
        />
      </section>
      <h2>Tenant Account</h2>
      <section className="reg-section">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="reg-username"
          required
          ref={userNameRef}
          onChange={(e) => inputControl(e, setUserName, userNameRef, setErrMsg)}
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
          onChange={(e) => inputControl(e, setEmail, emailRef, setErrMsg)}
        />
      </section>
      <section className="reg-section">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="reg-password"
          required
          ref={passwordRef}
          onChange={(e) => inputControl(e, setPassword, passwordRef, setErrMsg)}
        />
      </section>
      <Button text={'Add Tenant'} className={'button blue'} />
      <section className="reg-section">{errMsg}</section>
    </form>
  );
};

export default AddTenant;
