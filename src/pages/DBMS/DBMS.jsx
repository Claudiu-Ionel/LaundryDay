import { React, useState } from 'react';
import Admin from '../../Components/Admin/Admin';
import Button from '../../Components/button/Button';
import DropdownInput from '../../Components/Dropdown_input/Dropdown_input';
import './DBMS.css';
// import { Helmet } from 'react-helmet-async';
import TenantSection from '../../Components/TenantSection/TenantSection';
import AddTenant from '../../Components/AddTenant/AddTenant';

export default function DBMS() {
  const [showAddTenant, setShowAddTenant] = useState(false);

  const addTenant = (e) => {
    e.preventDefault();
    console.log('tenant added');
    setShowAddTenant(true);
  };
  const logOut = (e) => {
    e.preventDefault();
    console.log('logged out !');
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
  return (
    <>
      <nav id="navbar">
        <Admin admin={'DummyAdmin'} />
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
      <AddTenant moduleState={showAddTenant} setModuleState={setShowAddTenant} />
    </>
  );
}
