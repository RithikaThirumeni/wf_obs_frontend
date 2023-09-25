import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MaterialLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from "react";
import { useNavigate, Link} from "react-router-dom"
import { customerLogin } from "../../services/LoginService";
import { Alert, Hidden } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MaterialLink component={Link} color="inherit" to="/home">
        Visit Home
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formdata = new FormData(event.currentTarget);
        console.log({
        email: formdata.get('email'),
        password: formdata.get('password'),
        });
        const data = {
            "emailID":formdata.get('email'),
            "password":formdata.get('password')
        }
        customerLogin(data)
            .then((response) => {
              
                sessionStorage.setItem("customerID", response.data.obj.customerID);
                sessionStorage.setItem("emailID", response.data.obj.emailID);
                sessionStorage.setItem("firstName", response.data.obj.firstName);
                sessionStorage.setItem("lastName", response.data.obj.lastName);
                sessionStorage.setItem("phoneNumber", response.data.obj.phoneNumber);
                sessionStorage.setItem("residentAddress", response.data.obj.residentAddress);
                sessionStorage.setItem("dateOfBirth", response.data.obj.dateOfBirth);
                sessionStorage.setItem("password", response.data.obj.password);
                sessionStorage.setItem("pin", response.data.obj.pin );
                sessionStorage.setItem("activeStatus", response.data.obj.activeStatus );
                if(response.data.responseText==="Login Successful"){
                    navigate("/customerdashboard", {
                        state: {
                        customerID: response.data.obj.customerID, 
                        emailID: response.data.obj.emailID,
                        firstName: response.data.obj.firstName,
                        lastName: response.data.obj.lastName,
                        phoneNumber: response.data.obj.phoneNumber,
                        residentAddress: response.data.obj.residentAddress,
                        dateOfBirth: response.data.obj.dateOfBirth,
                        password: response.data.obj.password,
                        pin: response.data.obj.pin 
                    }});
                    navigate(0);
                }
                else {
                  setAlertContent(response.data.responseText+response.data.errors);
                  setAlert(true);
                }
            })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              { alert ? <Alert severity='error'>{alertContent}</Alert>:<></> }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <MaterialLink href="#" variant="body2">
                    Forgot password?
                  </MaterialLink>
                </Grid>
                <Grid item sx={{flex:1}}>
                  <MaterialLink component={Link} to="/register" variant="body2">
                    {"Register Now"}
                  </MaterialLink>
                </Grid>
                <Grid item>
                  <MaterialLink component={Link} to="/adminlogin" variant="body2">
                    {"Login as Admin"}
                  </MaterialLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}