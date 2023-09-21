import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { displayAccountSummary } from '../../services/AccountSummaryService';
import AccountSummaryTable from './AccountSummaryTable';

export default function AccountSummary() {

  const [alert, setAlert] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorText, setErrorText] = useState("");
  var [accountSummary, setAccountSummary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState("");
  const accountNumberChangeHandler=(event)=>{
    setAccountNumber(event.target.value);
  }
  const container = React.useRef(null);
  function displaySummaryActionHandler(event) {
    event.preventDefault();
    displayAccountSummary(accountNumber)
      .then((response)=>{
        if(response.data.responseText==="sucessfully retrieved summary"){
          setErrors(false);
          setAlert(true);
          setAccountSummary(response.data.obj);
          console.log(accountSummary);
        }
        else{
            setErrors(true);
            setErrorText(response.data.responseText);
        }
        console.log(response);
        
      })
      setAnchorEl(event.currentTarget);
  }


  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
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
          <br></br>
              <Button 
                type="submit"
                variant="contained"
                onClick={displaySummaryActionHandler}
              >
              View Summary
            </Button>
            
            <Typography sx={{ p: 2 }}>{errors?(<p>{errorText}</p>):(
              <Popover
              id='simplle-popover'
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
            >
              <AccountSummaryTable accountSummary={accountSummary} alert={alert}></AccountSummaryTable>
            </Popover>
            )}</Typography>
          
      </React.Fragment>
        {/* <AccountSummaryTable accountSummary={accountSummary} alert={alert}></AccountSummaryTable> */}
      </div>
  );
}


