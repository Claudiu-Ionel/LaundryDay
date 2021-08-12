import React from 'react';
import Admin from '../Components/Admin/Admin';
import Button from '../Components/button/Button';
import './DBMS.css';
export default function Homepage() {
  const addTenant = () => {
    console.log('tenant added');
  };
  const logOut = () => {
    console.log('logged out !');
  };
  return (
    <>
      <nav id="navbar">
        <Admin admin={'DummyAdmin'} />
        <div className="navbar-buttons">
          <Button text={'Add Tenant'} eventHandler={addTenant} className={'button blue'}></Button>
          <Button text={'Log out'} eventHandler={logOut} className={'button '}></Button>
        </div>
      </nav>
    </>
  );
}
