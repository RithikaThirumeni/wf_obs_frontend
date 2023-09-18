import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import axios from "axios";

export const Login = (props) => {
  const navigate = useNavigate();
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (Event) => {
    setEmailID(Event.target.value);
  };
  const passwordChangeHandler = (Event) => {
    setPassword(Event.target.value);
  };
  function handleForgotPassword(){
    props.forgotPasswordBtnClick(true)
  }
  const submitActionHandler = async (Event) => {
    Event.preventDefault();
    await axios
      .post("http://localhost:8080/customer/verifyCustomer/", {
        email: emailID,
        password: password,
      })
      .then((res) => {
        let loggedInCustomer = res.data.customerdata;
        sessionStorage.setItem(
          "loggedInCustomer",
          JSON.stringify(loggedInCustomer)
        );
        navigate("/dashboard");
      });
  };

  return (
    <>
      <form onSubmit={submitActionHandler}>
        <Grid container sx={{ marginBottom: "0.5rem" }}>
          <Grid item xs={3}>

          </Grid>
          <Grid item xs={9}>
            <text>Log in to the app</text>
          </Grid>
        </Grid>

        <Grid container alignItems={"center"} spacing={1}>
          <Grid item xs={3}>

          </Grid>
          <Grid item xs={3} sx={{ display: "flex" }}>
            <TextField
              label="Email"
              sx={{ borderColor: "white", color: "white", fontSize: "small" }}
              type="email"
              id="emailID"
              size="small"
              fullWidth
              value={emailID}
              placeholder="Enter Registered Email ID"
              onChange={emailChangeHandler}
              required
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Password"
              style={{ mb: '1 rem' }}
              type="password"
              id="password"
              size="small"
              fullWidth
              value={password}
              placeholder="Password"
              onChange={passwordChangeHandler}
              required
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              onClick={submitActionHandler}
            >
              Log In
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button size="small" variant="outlined" onClick={handleForgotPassword}>
              Forgot Password
            </Button>
          </Grid>
        </Grid>

        {/* <Grid item xs={1}>
              <Button
                size="small"
                variant="contained"
                type="reset"
                onClick={cancelActionHandler}
              >
                Cancel
              </Button>
            </Grid> */}

        {/* <Button
            size="small"
            sx={{ mt: '1rem' }}
            variant="outlined"
            type="submit"
            onClick={registerActionHandler}
          >
            Register Now
          </Button> */}
      </form>
    </>
  );
};
