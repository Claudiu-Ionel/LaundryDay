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
  const [cityId, setCityId] = useState('test');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [streetDropdownList, setStreetDropdownList] = useState([]);
  const [buildingDropdownList, setBuildingDropdownList] = useState([]);
  const [apartmentDropdownList, setapartmentDropdownList] = useState([]);
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
  //=============================================

  // TENANTS DATA ===============================
  const [tenantsData, setTenantsData] = useState([]);
  //=============================================
  // console.log(cities, streets, buildings);
  console.log(city);
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
      console.log(city, street, building);
      setCity('');
      setStreet('');
      setBuilding('');
      const encodedCity = encodeURI(city);
      const encodedStreet = encodeURI(street);
      const encodedBuilding = encodeURI(building);
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
          setState={setCity}
          setStateId={setCityId}
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
        {/* <DropdownInput
          placeholder={'Select building...'}
          choiceList={buildings}
          setState={setBuilding}
          state={building}
          inputValue={{ inputValue, setInputValue }}
        /> */}
        <Button text={'Show tenants'} eventHandler={showTenant} className={'button blue'}></Button>
      </form>
      <TenantSection data={tenantsData} />
      <AddTenant list={list} moduleState={showAddTenant} setModuleState={setShowAddTenant} />
    </>
  );
}
