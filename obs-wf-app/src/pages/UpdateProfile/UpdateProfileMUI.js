import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MaterialLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { DateField, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import en from 'dayjs/locale/en-in';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Hidden } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { updateCustomer } from "../../services/CustomerUpdateService";
import { AccountCircleOutlined } from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function UpdateCustomer() {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    
    const data = {
        "firstName":formdata.get('firstName'),
        "lastName":formdata.get('lastName'),
        "phoneNumber":formdata.get('phoneNumber'),
        "emailID":formdata.get('emailID'),
        "residentAddress":formdata.get('residentAddress'),
        "dateOfBirth":formdata.get('dateOfBirth'),
        "password":formdata.get('password'),
        "pin":formdata.get('pin')
    }
    
    updateCustomer(data)
        .then((response) => {
            if(response.data.responseText==="Updated Customer"){
                setAlertContent(response.data.responseText);
                setAlert(true);
                console.log(response)
                sessionStorage.setItem("emailID", response.data.obj.emailID);
                sessionStorage.setItem("firstName", response.data.obj.firstName);
                sessionStorage.setItem("lastName", response.data.obj.lastName);
                sessionStorage.setItem("phoneNumber", response.data.obj.phoneNumber);
                sessionStorage.setItem("residentAddress", response.data.obj.residentAddress);
                sessionStorage.setItem("dateOfBirth", response.data.obj.dateOfBirth);
                sessionStorage.setItem("password", response.data.obj.password);
                sessionStorage.setItem("pin", response.data.obj.pin );
            }
            else{
                setAlertContent(response.data.responseText+" "+response.data.errors);
                setAlert(true);
            }
            
        })
        .catch( (error) => {
          setAlertContent(error);
          setAlert(true);
        });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleOutlined/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Customer
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={sessionStorage.getItem("firstName")}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={sessionStorage.getItem("lastName")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailID"
                  label="Email Address"
                  name="emailID"
                  autoComplete="email"
                  defaultValue={sessionStorage.getItem("emailID")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  defaultValue={sessionStorage.getItem("password")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField inputProps={{inputMode:'numeric', pattern:'[0-9]*'}}
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  defaultValue={sessionStorage.getItem("phoneNumber")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="residentAddress"
                  label="Resident Address"
                  name="residentAddress"
                  autoComplete="City"
                  defaultValue={sessionStorage.getItem("residentAddress")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField inputProps={{inputMode:'numeric', pattern:'[0-9]*'}}
                  required
                  fullWidth
                  id="pin"
                  label="Account Pin"
                  name="pin"
                  autoComplete="pin"
                  helperText="Please enter a 4 digit pin"
                  defaultValue={sessionStorage.getItem("pin")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  type='date'
                  id="dateOfBirth"
                  label="Date of Birth"
                  name="dateOfBirth"
                  autoComplete="dateOfBirth"
                  defaultValue={sessionStorage.getItem("dateOfBirth")}
                />
              </Grid>
            </Grid>
            { alert ? <Alert severity='info'>{alertContent}</Alert>:<></> }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Details
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink component={Link} to="/customerdashboard" variant="body2">
                  Go to Dashboard
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}