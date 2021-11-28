import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from "react";
import Navigation from './Components/Navigation/Navbar';
import HomePage from './Pages/Home/HomePage';
import GroupPage from './Pages/Group/GroupPage'
import ItemPage from './Pages/Item/ItemPage'
import UserPage from './Pages/User/UserPage';
import UserGroups from './Pages/User/UserGroups'
import { Alert } from 'react-bootstrap';

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cleanAlertState = () => {
    setShowAlert(false);
    setAlertVariant("");
    setAlertHeading("");
    setAlertMsg("");
  };

  useEffect(() => {
    fetch("http://localhost:8000/auth/validate", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("TOKEN"),
      },
    })
      .then((res) => res.status)
      .then(
        (res) => {
          if (res === 200) {
            setIsLoggedIn(true);
          } else {
            if (localStorage.getItem("TOKEN")) {
              localStorage.removeItem("TOKEN");
              setAlertVariant("warning");
              setAlertHeading("Your session has ended. Please login");
              setShowAlert(true);
              setIsLoggedIn(false);
            }
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);

  return (
    <div>
      <Router>
        <Navigation
          setAlertVariant={setAlertVariant}
          setAlertHeading={setAlertHeading}
          setAlertMsg={setAlertMsg}
          setShowAlert={setShowAlert}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {showAlert ? (
          <Alert variant={alertVariant} onClose={cleanAlertState} dismissible>
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMsg}</p>
          </Alert>
        ) : (
          <></>
        )}
        <Routes>
          <Route exact strict path="/" element={<HomePage />} />
          <Route exact strict path="/user/:user_id" element={<UserPage
            setAlertVariant={setAlertVariant}
            setAlertHeading={setAlertHeading}
            setAlertMsg={setAlertMsg}
            setShowAlert={setShowAlert} />} />
          <Route exact strict path="/user/:user_id/group" element={<UserGroups
            setAlertVariant={setAlertVariant}
            setAlertHeading={setAlertHeading}
            setAlertMsg={setAlertMsg}
            setShowAlert={setShowAlert} />} />
          <Route exact strict path="/user/:user_id/group/:group_id" element={<GroupPage
            setAlertVariant={setAlertVariant}
            setAlertHeading={setAlertHeading}
            setAlertMsg={setAlertMsg}
            setShowAlert={setShowAlert} />} />
          <Route exact strict path="/user/:user_id/group/:group_id/item/:item_id" element={<ItemPage
            setAlertVariant={setAlertVariant}
            setAlertHeading={setAlertHeading}
            setAlertMsg={setAlertMsg}
            setShowAlert={setShowAlert} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
