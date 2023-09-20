import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { displayAccountSummary } from '../../services/AccountSummaryService';
import AccountSummaryTable from './AccountSummaryTable';

export default function AccountSummary() {

  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState(false);
  var [accountSummary, setAccountSummary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const accountNumberChangeHandler=(event)=>{
    setAccountNumber(event.target.value);
  }
  const container = React.useRef(null);
  function displaySummaryActionHandler(event) {
    event.preventDefault();
    displayAccountSummary(accountNumber)
      .then((response)=>{
        if(response.data.responseText==="sucessfully retrieved summary"){
          setAlert(true);
          setAccountSummary(response.data.obj);
          console.log(accountSummary);
        }
        else{
            setErrors(true);
            setAccountSummary(response.data.responseText);
        }
        console.log(response);
        
      })
  }
  return (
    <React.Fragment>
          <Title>Account Summary
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
          <Box sx={{ p: 1, my: 1 }} ref={container} />
          <div>
              <MaterialLink component={Link} color="primary" to="#" onClick={displaySummaryActionHandler}>
                  View Summary
              </MaterialLink>
          </div>
          <AccountSummaryTable accountSummary={accountSummary} alert={alert}></AccountSummaryTable>
      </React.Fragment>
      
  );
}