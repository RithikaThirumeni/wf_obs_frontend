import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
  var [accountStatement, setAccountStatement] = useState("");
  var [startDate, setStartDate] = useState("");
  var [endDate, setEndDate] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const accountNumberChangeHandler=(event)=>{
    setAccountNumber(event.target.value);
  }
  const container = React.useRef(null);
  function displayStatementActionHandler(event) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = {
        "startDate":formdata.get("startDate"),
        "endDate":formdata.get("endDate"),
        "sourceAccountNumber":formdata.get("accountNumber")
    }
    console.log(data);
    displayAccountStatement(accountNumber, formdata.get("startDate"), formdata.get("endDate"))
      .then((response)=>{
        console.log(response);
        if(response.data.responseText==="sucessfully retrieved statement"){
          setAlert(true);
          setAccountStatement(response.data.obj);
          console.log(accountStatement);
        }
        else{
            setErrors(true);
            setAccountStatement(response.data.responseText);
        }
        
      })
  }
  return (
    <React.Fragment > 
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
          </Box>
        </Box>
      </Container>
      {/* <AccountStatementTable accountStatement={accountStatement} alert={alert}></AccountStatementTable> */}
      </React.Fragment>
    //   <React.Fragment > 
    //       <Title>Account Statement
    //       </Title>
    //       <Typography component="p" variant="h4">
    //           <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    //               required
    //               id="accountNumber"
    //               label="Account Number"
    //               name="accountNumber"
    //               onChange={accountNumberChangeHandler}
    //               value={accountNumber} />
    //       </Typography>
    //       <Typography color="text.secondary" sx={{ flex: 1 }}>
    //           Enter Account Number
    //       </Typography>
          
    //       <Grid>
    //             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
    //                 <DateField required  id="startDate" name="startDate" label="Start Date" format="YYYY-MM-DD"/>
    //             </LocalizationProvider>
    //         </Grid>
    //         <Grid>
    //             <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
    //                 <DateField required   id="endDate" name="endDate" label="End Date" format="YYYY-MM-DD"/>
    //             </LocalizationProvider>
    //         </Grid>
    //       <div>
    //           <Button
    //           type="submit"
    //           onClick={displayStatementActionHandler}
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           View Statement
    //         </Button>
    //       </div>
          
    //       <AccountStatementTable accountStatement={accountStatement} alert={alert}></AccountStatementTable>
    //   </React.Fragment>
      
  );
}