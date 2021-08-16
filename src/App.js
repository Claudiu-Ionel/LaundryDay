import logo from './logo.svg';
import './App.css';
import RegistrationDBMS from './pages/DBMS/Registration_DBMS.jsx'
import LoginDBMS from './pages//DBMS/Login_DBMS.jsx'
import DBMS from './pages/DBMS/DBMS.jsx';
import AddTenant from './Components/AddTenant/AddTenant';
import Background from './Components/FrontEnd/background/background';
function App() {
  return (
    <>
      <div className="App">
        {/* <RegistrationDBMS /> */}
        {/* <LoginDBMS /> */}
        <DBMS />

        {/* <Background /> */}
      </div>
    </>

  );
}

export default App;
