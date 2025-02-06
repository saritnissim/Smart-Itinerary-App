import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <>
      <Button
        variant="contained"
        component={Link} // Use Link as Button's component
        to="/"
        sx={{ marginRight: 1 }}
      >
        Create New Account
      </Button>
      <Button variant="contained" component={Link} to="/login">
        Existing User
      </Button>
    </>
  );
};

export default AuthButtons;
