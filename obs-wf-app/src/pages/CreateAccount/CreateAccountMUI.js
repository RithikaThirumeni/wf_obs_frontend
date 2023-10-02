import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MaterialLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  DateField,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import en from "dayjs/locale/en-in";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Hidden,
  InputAdornment,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createAccount } from "../../services/CreateAccountService";
import { AccountCircleOutlined } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MaterialLink component={Link} color="inherit" to="/home">
        Visit Home Page
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AccountSignUp() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [creditCardReq, setCreditCardReq] = useState("");
  const [debitCardReq, setDebitCardReq] = useState("");
  const creditCardChangeHandler = (Event) => {
    setCreditCardReq(Event.target.checked);
  };
  const debitCardChangeHandler = (Event) => {
    setDebitCardReq(Event.target.checked);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    const data = {
      accountType: selectedValue,
      accountBalance: formdata.get("accountBalance"),
      openDate: formdata.get("openDate"),
      creditCardReq: creditCardReq,
      debitCardReq: debitCardReq,
      customerID: {
        customerID: Number(sessionStorage.getItem("customerID")),
        firstName: sessionStorage.getItem("firstName"),
        lastName: sessionStorage.getItem("lastName"),
        phoneNumber: Number(sessionStorage.getItem("phoneNumber")),
        emailID: sessionStorage.getItem("emailID"),
        residentAddress: sessionStorage.getItem("residentAddress"),
        dateOfBirth: sessionStorage.getItem("dateOfBirth"),
        password: sessionStorage.getItem("password"),
        pin: Number(sessionStorage.getItem("pin")),
      },
    };
    console.log(data);
    createAccount(data)
      .then((response) => {
        console.log(response);
        if (response.data.responseText === "Save Successful!") {
          setAlertContent(response.data.responseText);
          setAlert(true);
          toast.success(response.data.responseText, { autoClose: 5000 });
        } else {
          setAlertContent(response.data.responseText);
          setAlert(true);
          toast.error(response.data.responseText);
        }
      })
      .catch((error) => {
        alert("Error = " + error);
        toast.error(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="select-label">Account Type</InputLabel>
                <Select
                  sx={{ flex: 1 }}
                  labelId="select-label"
                  id="select"
                  required
                  fullWidth
                  value={selectedValue}
                  onChange={handleChange}
                  helperText="select from the drop-down"
                >
                  <MenuItem value="Savings">
                    <em>Savings</em>
                  </MenuItem>
                  <MenuItem value="Salary">
                    <em>Salary</em>
                  </MenuItem>
                  <MenuItem value="Current">
                    <em>Current</em>
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ step: 0.01 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Rupees</InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                  type="number"
                  id="accountBalance"
                  label="Account Balance"
                  name="accountBalance"
                  helperText="enter upto 2 decimal places"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  type="date"
                  id="openDate"
                  label="Open Date"
                  name="openDate"
                  autoComplete="openDate"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="creditCardReq"
                      value={creditCardReq}
                      onClick={creditCardChangeHandler}
                    />
                  }
                  label="Credit Card Required"
                ></FormControlLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="debitCardReq"
                      value={debitCardReq}
                      onClick={debitCardChangeHandler}
                    />
                  }
                  label="Debit Card Required"
                ></FormControlLabel>
              </Grid>
            </Grid>
            {alert ? <Alert severity="info">{alertContent}</Alert> : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink
                  component={Link}
                  to="/customerdashboard"
                  variant="body2"
                >
                  Go to Dashboard
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
