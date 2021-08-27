import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../App';
import Admin from '../../Components/Admin/Admin';
import Button from '../../Components/button/Button';
import DropdownInput from '../../Components/Dropdown_input/Dropdown_input';
import './DBMS.css';
// import { Helmet } from 'react-helmet-async';
import TenantSection from '../../Components/TenantSection/TenantSection';
import AddTenant from '../../Components/AddTenant/AddTenant';

export default function DBMS() {
  const history = useHistory();
  const globalState = useGlobalState();
  const admin = globalState.admin;
  const [showAddTenant, setShowAddTenant] = useState(false);

  const addTenant = (e) => {
    e.preventDefault();
    console.log('tenant added');
    setShowAddTenant(true);
  };

  const logOut = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const showTenant = (e) => {
    e.preventDefault();
    if (city && street && area) {
      console.log(city, street, area);
      setCity('');
      setStreet('');
      setArea('');
    } else {
      return;
    }
  };

  const list = ['Lund', 'Malmö', 'Stockholm'];
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  if (admin.id === null || admin.username === null) {
    return (
      <>
        <h3>You shouldn't be here O_o</h3>
        <Button
          text={'Log In'}
          eventHandler={() => {
            history.push('/');
          }}
          className={'button blue'}
        ></Button>
      </>
    );
  }
  return (
    <>
      <nav id="navbar">
        <Admin admin={admin} />
        <div className="navbar-buttons">
          <Button text={'Add Tenant'} eventHandler={addTenant} className={'button blue'}></Button>
          <Button text={'Log out'} eventHandler={logOut} className={'button '}></Button>
        </div>
      </nav>
      <form id="search-menu">
        <DropdownInput
          placeholder={'Select place...'}
          choiceList={list}
          setState={setCity}
          state={city}
        />
        <DropdownInput
          placeholder={'Select place...'}
          choiceList={list}
          setState={setStreet}
          state={street}
        />
        <DropdownInput
          placeholder={'Select place...'}
          choiceList={list}
          setState={setArea}
          state={area}
        />
        <Button text={'Show tenants'} eventHandler={showTenant} className={'button blue'}></Button>
      </form>
      <TenantSection />
      <AddTenant list={list} moduleState={showAddTenant} setModuleState={setShowAddTenant} />
    </>
  );
}
