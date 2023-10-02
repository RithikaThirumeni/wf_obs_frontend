import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
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
import { Alert, Hidden, InputAdornment, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { createAccountForUser } from "../../../services/CreateAdminAccountService";
import { AccountCircleOutlined } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MaterialLink component={Link} color="inherit" to="/home">
        Visit Home Page
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
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
    const creditCardChangeHandler = (Event) =>{
        setCreditCardReq(Event.target.checked);
    };
    const debitCardChangeHandler = (Event) =>{
        setDebitCardReq(Event.target.checked);
    };
    const handleChange=(event)=>{
        setSelectedValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);
        const data = {
            "accountType":selectedValue,
            "accountBalance":Number(formdata.get('accountBalance')),
            "openDate":formdata.get('openDate'),
            "creditCardReq":creditCardReq,
            "debitCardReq":debitCardReq
        }
        console.log(data);
        createAccountForUser(data, Number(formdata.get('customerID')))
            .then((response) => {
                if(response.data.responseText==="created new account"){
                    setAlertContent(response.data.responseText);
                    setAlert(true);
                }
                else{
                    setAlertContent(response.data.responseText+" "+response.data.errors);
                    setAlert(true);
                }    
            })
            .catch( error => {
                setAlertContent("Error = "+error);
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
            Create New Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                    required
                    fullWidth
                    id="customerID"
                    label="Customer ID"
                    name="customerID"
                    helperText="4 digit customer ID"
                    />
                </Grid>
              <Grid item xs={12} >
                <InputLabel id="select-label">Account Type</InputLabel>
                <Select sx={{flex:1}}
                    labelId='select-label'
                    id='select'
                    required 
                    fullWidth 
                    value={selectedValue} 
                    onChange={handleChange}
                    helperText="select from the drop-down" 
                >
                    <MenuItem value="Savings"><em>Savings</em></MenuItem>
                    <MenuItem value="Salary"><em>Salary</em></MenuItem>
                    <MenuItem value="Current"><em>Current</em></MenuItem>
                </Select>
              </Grid>              
              <Grid item xs={12}>
                <TextField inputProps={{step:0.01}}
                    InputProps={{endAdornment:<InputAdornment position='end'>Rupees</InputAdornment>}}
                  required
                  fullWidth
                  type='number'
                  id="accountBalance"
                  label="Account Balance"
                  name="accountBalance"
                  helperText="enter upto 2 decimal places"
                />
              </Grid>
              
              <Grid item xs={12}>
                    <Grid item xs={12} sm={12}>
                      <TextField InputLabelProps={{shrink:true}}
                        required
                        fullWidth
                        type='date'
                        id="openDate"
                        label="Open Date"
                        name="openDate"
                      />
                    </Grid>
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel control={<Checkbox id='creditCardReq' value={creditCardReq} onClick={creditCardChangeHandler}/>} label="Credit Card Required"></FormControlLabel>
              <FormControlLabel control={<Checkbox id='debitCardReq' value={debitCardReq} onClick={debitCardChangeHandler}/>} label="Debit Card Required"></FormControlLabel>
              </Grid>
            </Grid>
            { alert ? <Alert severity='info'>{alertContent}</Alert>:<></> }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account for User
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink component={Link} to="/admindashboard" variant="body2">
                  Go back to Admin Dashboard
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
