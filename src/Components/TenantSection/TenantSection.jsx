import React from 'react';
import Button from '../button/Button';
import './TenantsSection.css';

const TenantSection = ({ data }) => {
  function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }
  const userData = [
    {
      name: 'Bob Junior',
      apartment: 1202,
      email: 'bob@gmail.com',
      id: 197506952241,
    },
    {
      name: 'Bob Junior',
      apartment: 1202,
      email: 'bob@gmail.com',
      id: 197506952241,
    },
    {
      name: 'Bob Junior',
      apartment: 1202,
      email: 'bob@gmail.com',
      id: 197506952241,
    },
  ];
  data = userData;
  return (
    <div id="tenants-table">
      <div className="table-headers">
        <div className="header-wrapper">
          <div className="header">Name</div>
        </div>
        <div className="header-wrapper">
          <div className="header">Apartment</div>
        </div>
        <div className="header-wrapper">
          <div className="header">Email</div>
        </div>
        <div className="header-wrapper">
          <div className="header">Id</div>
        </div>
      </div>
      {data.map((tenant, index) => {
        const id = insert(tenant.id.toString(), 7, '-');
        return (
          <div index={tenant.name} className="tenant">
            <div className="details avatar-name">
              <div className="tenant-avatar"></div>
              <div className="tenant-name">{tenant.name}</div>
            </div>
            <div className="details tenant-apartment">{tenant.apartment}</div>
            <div className="details tenant-email">{tenant.email}</div>
            <div className="details tenant-id">{id}</div>
            <Button
              text="X"
              eventHandler={(e) => {
                console.log(e.target.parentElement);
              }}
              className="button delete"
            />
          </div>
        );
      })}
    </div>
  );
};

export default TenantSection;
