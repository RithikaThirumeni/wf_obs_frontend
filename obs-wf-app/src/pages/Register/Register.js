import { useState } from "react";
import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { customerRegister } from "../../services/RegisterService";
import { Login } from "../Login/Login";
import { Home } from "../../components/Home";
export const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailID, setEmailID] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [residentAddress, setResidentAddress] = useState("");

  const emailChangeHandler = (Event) => {
    setEmailID(Event.target.value);
  };
  const passwordChangeHandler = (Event) => {
    setPassword(Event.target.value);
  };
  const firstNameChangeHandler = (Event) => {
    setFirstName(Event.target.value);
  };
  const lastNameChangeHandler = (Event) => {
    setLastName(Event.target.value);
  };
  const phoneNumberChangeHandler = (Event) => {
    setPhoneNumber(Event.target.value);
  };
  const residentAddressChangeHandler = (Event) => {
    setResidentAddress(Event.target.value);
  };
  const pinChangeHandler = (Event) => {
    setPin(Event.target.value);
  };
  const dateOfBirthChangeHandler = (Event) => {
    setDateOfBirth(Event.target.value);
  };

  const submitActionHandler = (Event) => {
    Event.preventDefault();
    const data = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: emailID,
      address: residentAddress,
      dateOfBirth: dateOfBirth,
      password: password,
      pin: pin,
    };
    customerRegister(data)
      .then((response) => {
        console.log(response);
        alert(response.data.responseText);
      })
      .catch((error) => {
        alert("Error = " + error);
      });
  };
  return (
    <>
      <Box sx={{ display: 'inline-block' }}>
        <Paper elevation={2} sx={{ padding: '1rem' }}>
          <h3 style={{margin: "0 0 1rem 1rem"}}>Register</h3>
          <form>
            <Grid container paddingLeft={'1rem'} spacing={1}>
              <Grid item xs={5}>
                <label for="firstname">First name: </label>
                <TextField

                  size="small"
                  name="firstname"
                  value={firstName}
                  placeholder="First Name"
                  onChange={firstNameChangeHandler}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <label for="lastname">Last name: </label>
                <TextField

                  size="small"
                  name="lastname"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={lastNameChangeHandler}
                  required
                />
              </Grid>
            </Grid>

            <div className="text-field">
              <label style={{ display: 'block' }} for="password">Password: </label>
              <TextField
                size="small"
                type="password"
                name="password"
                value={password}
                placeholder="Enter Password"
                onChange={passwordChangeHandler}
                required
              />
            </div>

            <div className="text-field">
              <label style={{ display: 'block' }} for="phoneNumer">PhoneNumner: </label>
              <TextField
                size="small"
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Enter Phone Number"
                onChange={phoneNumberChangeHandler}
                required
              />
            </div>

            <div className="text-field">
              <label style={{ display: 'block' }} for="dateOfBirth">Date of Birth: </label>
              <TextField
                size="small"
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={dateOfBirthChangeHandler}
                required
              />
            </div>

            <div className="text-field">
              <label style={{ display: 'block' }} for="address">Resident Address: </label>
              <TextField
                size="small"
                name="address"
                value={residentAddress}
                placeholder="Enter Resident Address"
                multiline
                fullWidth
                rows={2}
                onChange={residentAddressChangeHandler}
                required
              />
            </div>

            <Button sx={{ml: "1rem"}} type="submit" variant="contained" onClick={submitActionHandler}>
              Register Now
            </Button>
          </form>
          <Grid container spacing={1} sx={{m: "0.5rem 0.5rem"}}>
            <Grid item xs={6}>
              <h4>
                <Link to="/login">Login with Email and Password</Link>
              </h4>
            </Grid>
            <Grid item xs={6}>
              <h4>
                <Link to="/home">Go to Home</Link>
              </h4>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};
