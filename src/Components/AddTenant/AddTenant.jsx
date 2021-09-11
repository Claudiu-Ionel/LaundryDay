import { useState, useRef } from 'react';
import './AddTenant.css';
import inputControl from '../../Functions/InputControl/InputControl';
import Button from '../button/Button';
import DropdownInput from '../Dropdown_input/Dropdown_input';
import { useGlobalState } from '../../App';

const AddTenant = ({ moduleState, setModuleState }) => {
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  // const [userName, setUserName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const globalState = useGlobalState();
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');
  const formRef = useRef(null);
  const firstNameRef = useRef(null);
  const LastNameRef = useRef(null);

  //CONTEXT VARIABLES
  const cities = globalState.cities;
  const streets = globalState.streets;
  const buildings = globalState.buildings;
  const apartments = globalState.apartments;
  //=============================================
  const tenantToAdd = {
    firstName,
    LastName,
    // apartmentNr,
    // userName,
    // email,
    // password,
  };
  const addTenant = (e) => {
    e.preventDefault();
    console.log(tenantToAdd);
    formRef.current.reset();
  };
  if (!moduleState) {
    return <></>;
  }

  return (
    <div
      className="cover"
      onClick={(e) => {
        if (e.target.className === 'cover') {
          setModuleState(false);
        }
      }}
    >
      <form ref={formRef} onSubmit={(e) => addTenant(e)} id="addTenant-form">
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

        <section className="reg-section">
          <DropdownInput
            placeholder="Select city..."
            choiceList={cities}
            state={city}
            setState={setCity}
          />
          <DropdownInput
            placeholder={'Select street...'}
            choiceList={streets}
            setState={setStreet}
            state={street}
            previousSiblingData={city}
            objProp={'city_id'}
            disabled={!city}
          />
          <DropdownInput
            placeholder={'Select building...'}
            choiceList={buildings}
            setState={setBuilding}
            state={building}
            previousSiblingData={street}
            objProp={'street_id'}
            disabled={!street}
          />
          <DropdownInput
            placeholder="Select apartment..."
            choiceList={apartments}
            setState={setApartment}
            state={apartment}
            previousSiblingData={building}
            objProp={'building_id'}
            disabled={!building}
          />
        </section>

        {/* <h2>Tenant Account</h2>
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
        </section> */}
        <Button text={'Add Tenant'} className={'button blue'} />
        <section className="reg-section">{errMsg}</section>
        <Button
          text="X"
          className={'button cancel-module'}
          eventHandler={(e) => {
            setModuleState(false);
          }}
        />
      </form>
    </div>
  );
};

export default AddTenant;
