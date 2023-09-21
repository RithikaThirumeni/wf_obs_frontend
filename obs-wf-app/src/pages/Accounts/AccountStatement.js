import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import { DateField, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import {AdapterDateFns} from '@mui/lab/AdapterDateFns'
import dayjs from 'dayjs';
import en from 'dayjs/locale/en-in';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { displayAccountStatement } from '../../services/AccountStatementService';
import AccountStatementTable from './AccountStatementTable';
import { FormControl } from '@mui/material';

export default function AccountStatement() {

  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState("");
  var [accountStatement, setAccountStatement] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const accountNumberChangeHandler=(event)=>{
    setAccountNumber(event.target.value);
  }
  const container = React.useRef(null);
  function displayStatementActionHandler(event) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    displayAccountStatement(accountNumber, formdata.get("startDate"), formdata.get("endDate"))
      .then((response)=>{
        console.log(response);
        if(response.data.responseText==="sucessfully retrieved statement"){
            setErrors(false);
          setAlert(true);
          setAccountStatement(response.data.obj);
          console.log(accountStatement, response.data.responseText);
        }
        else{
            setErrors(true);
            setErrorText(response.data.responseText);
        }
        
      })
      setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <React.Fragment > 
    <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}
        >
          <Title>Account Statement</Title>
          <Box component="form" noValidate onSubmit={displayStatementActionHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid sx={{flex:1}}>
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                  id="accountNumber"
                  label="Account Number"
                  name="accountNumber"
                  onChange={accountNumberChangeHandler}
                  value={accountNumber} />
                </Grid>
            </Grid>
            <br></br>
            <Grid sx={{flex:1}}>
                 <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
                     <DateField required  id="startDate" name="startDate" label="Start Date" format="YYYY-MM-DD"/>
                 </LocalizationProvider>
             </Grid>
             <br></br>
             <Grid sx={{flex:1}}>
                 <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
                     <DateField required   id="endDate" name="endDate" label="End Date" format="YYYY-MM-DD"/>
                 </LocalizationProvider>
             </Grid>
             <br></br>
            <Button
              type="submit"
              variant="contained"
            >
              Show Account Statement
            </Button>
            
            <Typography sx={{ p: 2 }}>{errors?(<p>{errorText}</p>):(
                <Popover
                id='simple-popover'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorPosition={{left:'50%', top:'50%'}}
                transformOrigin={{
                  vertical: 'center',
                  horizontal: 'center',
                }}
              >
                
                <AccountStatementTable accountStatement={accountStatement} alert={alert}></AccountStatementTable>
              </Popover>
            )}</Typography>
          </Box>
        </Box>
      </Container>
      </React.Fragment>
      
  );
}