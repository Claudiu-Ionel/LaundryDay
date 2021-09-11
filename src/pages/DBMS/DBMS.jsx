import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalState } from '../../App';
import Axios from 'axios';
import Admin from '../../Components/Admin/Admin';
import Button from '../../Components/button/Button';
import DropdownInput from '../../Components/Dropdown_input/Dropdown_input';
// import { Helmet } from 'react-helmet-async';
import TenantSection from '../../Components/TenantSection/TenantSection';
import AddTenant from '../../Components/AddTenant/AddTenant';
import './DBMS.css';

export default function DBMS() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const globalState = useGlobalState();

  const [showAddTenant, setShowAddTenant] = useState(false);

  //FORM VARIABLES =======================
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');

  //===========================================

  //CONTEXT VARIABLES
  const admin = globalState.admin;
  const cities = globalState.cities;
  const setCities = globalState.setCities;
  const streets = globalState.streets;
  const setStreets = globalState.setStreets;
  const buildings = globalState.buildings;
  const setBuildings = globalState.setBuildings;
  const setApartments = globalState.setApartments;
  const setLastCityState = globalState.lastState.setLastCityState;
  const setLastStreetState = globalState.lastState.setLastStreetState;
  const setLastBuildingState = globalState.lastState.setLastBuildingState;
  //=============================================

  // TENANTS DATA ===============================
  const [tenantsData, setTenantsData] = useState([]);
  //=============================================

  //USE EFFECT ==================================
  useEffect(() => {
    const getData = async () => {
      try {
        const citiesCall = await Axios.get('http://localhost:3001/getCities');
        const streetsCall = await Axios.get('http://localhost:3001/getStreets');
        const buildingsCall = await Axios.get('http://localhost:3001/getBuildings');
        const apartmentsCall = await Axios.get('http://localhost:3001/getApartments');

        const citiesData = citiesCall.data;
        const streetsData = streetsCall.data;
        const buildingsData = buildingsCall.data;
        const apartmentsData = apartmentsCall.data;

        setCities(citiesData);
        setStreets(streetsData);
        setBuildings(buildingsData);
        setApartments(apartmentsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [setCities, setStreets, setBuildings, setApartments]);
  //==============================================

  // FUNCTIONS ===================================
  const addTenant = (e) => {
    e.preventDefault();
    console.log('tenant added');
    setShowAddTenant(true);
  };

  const logOut = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const showTenant = async (e) => {
    e.preventDefault();
    if (city && street && building) {
      setCity(null);
      setStreet(null);
      setBuilding(null);
      const encodedCity = encodeURI(city['name']);
      const encodedStreet = encodeURI(street['name']);
      const encodedBuilding = encodeURI(building['number']);
      try {
        const request = await Axios({
          method: 'get',
          url: `http://localhost:3001/showTenants/${encodedCity}/${encodedStreet}/${encodedBuilding}`,
        });
        setTenantsData(request.data);
      } catch (err) {}
    } else {
      return;
    }
  };
  //===================================================

  const list = ['Lund', 'Malmö', 'Stockholm'];

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
  if (loading) {
    return <h3>Loading data...</h3>;
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
          placeholder={'Select city...'}
          choiceList={cities}
          state={city}
          setState={setCity}
          setLastState={setLastCityState}
        />
        <DropdownInput
          placeholder={'Select street...'}
          choiceList={streets}
          setState={setStreet}
          state={street}
          previousSiblingData={city}
          objProp={'city_id'}
          disabled={!city}
          setLastState={setLastStreetState}
        />
        <DropdownInput
          placeholder={'Select building...'}
          choiceList={buildings}
          setState={setBuilding}
          state={building}
          previousSiblingData={street}
          objProp={'street_id'}
          disabled={!street}
          setLastState={setLastBuildingState}
        />
        <Button text={'Show tenants'} eventHandler={showTenant} className={'button blue'}></Button>
      </form>
      <TenantSection data={tenantsData} setData={setTenantsData} />
      <AddTenant list={list} moduleState={showAddTenant} setModuleState={setShowAddTenant} />
    </>
  );
}
