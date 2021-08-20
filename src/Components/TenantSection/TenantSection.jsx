import { React } from 'react';
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
      name: 'Mickey Mouse',
      apartment: 1202,
      email: 'mickey@gmail.com',
      id: 197506952241,
    },
    {
      name: 'Bad Joe',
      apartment: 1202,
      email: 'Joe@gmail.com',
      id: 197506952241,
    },
  ];
  data = userData;
  return (
    <div id="tenants-table">
      <div className="table-headers">
        <div className="header-wrapper">
          <div className="header name">Name</div>
        </div>
        <div className="header-wrapper">
          <div className="header apartment">Apartment</div>
        </div>
        <div className="header-wrapper">
          <div className="header email">Email</div>
        </div>
        <div className="header-wrapper">
          <div className="header id">Id</div>
        </div>
      </div>
      {data.map((tenant, index) => {
        const id = insert(tenant.id.toString(), 7, '-');
        return (
          <div key={index} className="tenant">
            <Button
              text="Delete"
              eventHandler={(e) => {
                console.log(e.target.parentElement);
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const tenant = e.target.nextElementSibling;
                let button = e.target;
                tenant.style.backgroundColor = 'rgb(252, 57, 57)';
                tenant.style.color = '#fff';
                button.classList.add('black');
                button.classList.remove('red');
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                const tenant = e.target.nextElementSibling;
                let button = e.target;
                tenant.style.backgroundColor = 'transparent';
                tenant.style.color = 'black';
                button.classList.remove('black');
                button.classList.add('red');
              }}
              className={'button delete-tenant red'}
            />
            <div className="tenant-details">
              <div className=" tenant-data tenant-name">{tenant.name}</div>
              <div className=" tenant-data tenant-apartment">{tenant.apartment}</div>
              <div className=" tenant-data tenant-email">{tenant.email}</div>
              <div className=" tenant-data tenant-id">{id}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TenantSection;
