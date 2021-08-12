import logo from './logo.svg';
import './App.css';
import RegistrationDBMS from './pages/Registration_DBMS.jsx'
import LoginDBMS from './pages/Login_DBMS.jsx'
import DBMS from './pages/DBMS';
import { Helmet } from 'react-helmet';
function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Våran Tvättstuga</title>
      </Helmet>
        {/* <LoginDBMS /> */}
        <DBMS />
    </div>
  );
}

export default App;
