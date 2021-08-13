import logo from './logo.svg';
import './App.css';
import RegistrationDBMS from './pages/Registration_DBMS.jsx'
import LoginDBMS from './pages/Login_DBMS.jsx'
import DBMS from './pages/DBMS';
import AddTenant from './Components/AddTenant/AddTenant';
function App() {
  return (
    <>
      <div className="App">
        {/* <RegistrationDBMS /> */}
        {/* <LoginDBMS /> */}
        {/* <DBMS /> */}
        <AddTenant />
      </div>
    </>

  );
}

export default App;
