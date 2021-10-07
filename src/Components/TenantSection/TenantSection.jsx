import { React, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { useGlobalState } from '../../App';
import Button from '../button/Button';
import './TenantsSection.css';

const TenantSection = ({ data, setData }) => {
  // function insert(str, index, value) {
  //   return str.substr(0, index) + value + str.substr(index);
  // }
  const globalState = useGlobalState();
  const lastCityState = globalState.lastState.lastCityState;
  const lastStreetState = globalState.lastState.lastStreetState;
  const lastBuildingState = globalState.lastState.lastBuildingState;

  const getTenantsData = useCallback(async () => {
    if (lastCityState && lastStreetState && lastBuildingState) {
      const encodedCity = encodeURI(lastCityState['name']);
      const encodedStreet = encodeURI(lastStreetState['name']);
      const encodedBuilding = encodeURI(lastBuildingState['number']);
      try {
        const request = await Axios({
          method: 'get',
          url: `http://localhost:3001/showTenants/${encodedCity}/${encodedStreet}/${encodedBuilding}`,
        });
        setData(request.data);
      } catch (err) {}
    } else {
      return;
    }
  }, [lastCityState, lastStreetState, lastBuildingState, setData]);

  const deleteTenant = useCallback(
    async (tenantId) => {
      try {
        await Axios({
          method: 'delete',
          url: `http://localhost:3001/deleteTenant/${tenantId}`,
        }).then(getTenantsData());
      } catch (error) {
        console.log(error);
      }
    },
    [getTenantsData],
  );

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
        // const id = insert(tenant.id.toString(), 7, '-');
        return (
          <div key={index} className="tenant">
            <Button
              text="Delete"
              eventHandler={(e) => deleteTenant(tenant.id).then(getTenantsData())}
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
              <div className=" tenant-data tenant-name">
                {tenant.first_name} {tenant.second_name}
              </div>
              <div className=" tenant-data tenant-apartment">{tenant.apartment_number}</div>
              <div className=" tenant-data tenant-email">{tenant.id}</div>
              <div className=" tenant-data tenant-id">{tenant.personal_number}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TenantSection;
