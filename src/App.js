import { createContext, useContext, useState } from "react";
import "./App.css";
// Back end components:
import RegistrationDBMS from "./pages/DBMS/Registration_DBMS.jsx";
import LoginDBMS from "./pages//DBMS/Login_DBMS.jsx";
import DBMS from "./pages/DBMS/DBMS.jsx";
import AddTenant from "./Components/AddTenant/AddTenant";
// Front end components:
import Background from "./Components/FrontEnd/background/background";
import LoginForm from "./Components/FrontEnd/LoginForm/Login";
import Cal from "./Components/FrontEnd/Calendar/Cal";
import TimePicker from "./Components/FrontEnd/TimePicker/TimePicker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const AppContext = createContext();

export function useGlobalState() {
  const globalState = useContext(AppContext);

  return globalState;
}

function App() {
  const [admin, setAdmin] = useState({ id: null, username: null });

  const globalState = {
    admin,
    setAdmin,
  };
  return (
    <main>
      <Background />
      <Cal />
      {/*<div className="App">
      <AppContext.Provider value={globalState}>
        <Router>
          <Switch>
            <Route path="/DBMS">
              <DBMS />
            </Route>
            <Route path="/">
              <LoginDBMS />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>*/}
    </main>
  );
}

export default App;
