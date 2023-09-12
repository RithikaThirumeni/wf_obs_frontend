import { useNavigate } from "react-router-dom";
import { customerLogin } from "../../services/LoginService";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (Event) => {
    setEmailID(Event.target.value);
  };
  const passwordChangeHandler = (Event) => {
    setPassword(Event.target.value);
  };
  const submitActionHandler = (Event) => {
    Event.preventDefault();
    const data = {
      email: emailID,
      pwd: password,
    };
    // console.log(data);
    customerLogin(data).then((response) => {
      console.log(response);
      // alert("Customer ID = "+response.data.customerID);
      if (response.data) {
        navigate("/dashboard", {
          state: {
            customerId: response.data.customerdata.customerId,
            email: response.data.customerdata.email,
            firstName: response.data.customerdata.firstName,
            lastName: response.data.customerdata.lastName,
            phoneNumber: response.data.customerdata.phoneNumber,
            address: response.data.customerdata.address,
            dateOfBirth: response.data.customerdata.dateOfBirth,
          },
        });
        navigate(0);
      } else alert("Login failed");
    });
  };
  const cancelActionHandler = (Event) => {
    setEmailID("");
    setPassword("");
  };
  const registerActionHandler = (Event) => {
    navigate("/register");
  };
  return (
    <>
      <form onSubmit={submitActionHandler}>
        <center>
          <div>
            <TextField
              label="Email"
              type="email"
              id="emailID"
              size="small"
              value={emailID}
              placeholder="Enter Registered Email ID"
              onChange={emailChangeHandler}
              required
            ></TextField>
          </div>
          <div>
            <TextField
              type="password"
              id="password"
              size="small"
              value={password}
              label="Password"
              onChange={passwordChangeHandler}
              required
            ></TextField>
          </div>
          <Grid justifyContent={"center"} container spacing={2}>
            <Grid item xs={1}>
              <Button
                variant="contained"
                type="submit"
                onClick={submitActionHandler}
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                type="reset"
                onClick={cancelActionHandler}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            type="submit"
            onClick={registerActionHandler}
          >
            Register Now!
          </Button>
        </center>
      </form>
    </>
  );
};
