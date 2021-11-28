import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  const navigate = useNavigate()
  const clickHandler = () => {
    localStorage.removeItem('TOKEN')
    navigate("/");
    props.setIsLoggedIn(false);
    props.setAlertVariant('success')
    props.setAlertHeading("Session has ended")
    props.setShowAlert(true)
  };

  return (
    <Button variant="secondary" onClick={clickHandler}>
      Logout
    </Button>
  );
}