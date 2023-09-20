import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import Container from '@mui/material/Container';
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
  const handleStartDateChange=(event)=>{
    setStartDate(event.target.value);
  }
  const handleEndDateChange=(event)=>{
    setEndDate(event.target.value);
  }
  const container = React.useRef(null);
  function displayStatementActionHandler(event) {
    event.preventDefault();
    const data = {
        "startDate":startDate,
        "endDate":endDate,
        "sourceAccountNumber":accountNumber
    }
    var sdate = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate();
    console.log(sdate);
    displayAccountStatement(accountNumber, startDate, endDate)
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
          <Title>Account Statement
          </Title>
          <Typography component="p" variant="h4">
              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  required
                  id="accountNumber"
                  label="Account Number"
                  name="accountNumber"
                  onChange={accountNumberChangeHandler}
                  value={accountNumber} />
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
              Enter Account Number
          </Typography>
          <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
                    <DateField required onChange={handleStartDateChange} id="startDate" name="startDate" label="Start Date" format="YYYY-MM-DD"/>
                </LocalizationProvider>
            </Grid>
            <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={en}>
                    <DateField required  onChangeid={handleEndDateChange} id="endDate" name="endDate" label="End Date" format="YYYY-MM-DD"/>
                </LocalizationProvider>
            </Grid>
          <Box sx={{ p: 1, my: 1 }} ref={container} />
          <div>
              <MaterialLink component={Link} color="primary" to="#" onClick={displayStatementActionHandler}>
                  View Statement
              </MaterialLink>
          </div>
          <AccountStatementTable accountStatement={accountStatement} alert={alert}></AccountStatementTable>
      </React.Fragment>
      
  );
}