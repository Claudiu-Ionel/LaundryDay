import logo from './logo.svg';
import './App.css';
// Back end components:
import RegistrationDBMS from './pages/DBMS/Registration_DBMS.jsx'
import LoginDBMS from './pages//DBMS/Login_DBMS.jsx'
import DBMS from './pages/DBMS/DBMS.jsx';
import AddTenant from './Components/AddTenant/AddTenant';
// Front end components:
import Background from './Components/FrontEnd/background/background';
import LoginForm from './Components/FrontEnd/LoginForm/Login';
import TimePicker from './Components/FrontEnd/TimePicker/TimePicker';
function App() {
  return (
    <>
      <div className="App">
        {/* <RegistrationDBMS /> */}
        {/* <LoginDBMS /> */}
        <DBMS />

        {/* <Background /> */}
        {/* <LoginForm /> */}
        {/* <TimePicker /> */}
      </div>
    </>

  );
}

export default App;
