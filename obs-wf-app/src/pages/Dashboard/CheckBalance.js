import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { displayAccountBalance } from "../../services/DisplayAccountService";
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';

export default function CheckBalance() {

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const accountNumberChangeHandler=(event)=>{
    setAccountNumber(event.target.value);
  }
  const container = React.useRef(null);
  function displayBalanceActionHandler(event) {
    event.preventDefault();
    displayAccountBalance(accountNumber)
      .then((response)=>{
        if(response.data.responseText==="success"){
          setAlert(true);
          setAlertContent(response.data.obj);
        }
        else{
          setAlert(true);
          setAlertContent(response.data.responseText);
        }
        console.log(response);
        
      })
  }
  return (
    <React.Fragment>
      <Title>Check Balance
      </Title>
      <Typography component="p" variant="h4">
        <TextField inputProps={{inputMode:'numeric', pattern:'[0-9]*'}}
                  required
                  id="accountNumber"
                  label="Account Number"
                  name="accountNumber"
                  onChange={accountNumberChangeHandler}
                  value={accountNumber}
                />
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Enter your Account Number
        {alert ? (
          <Portal container={container.current}>
            <span>{alertContent}</span>
          </Portal>
        ) : null}
      </Typography>
      <Box sx={{ p: 1, my: 1 }} ref={container} />
      <div>
        <MaterialLink component={Link} color="primary" to="#" onClick={displayBalanceActionHandler}>
          View balance
        </MaterialLink>
      </div>
    </React.Fragment>
  );
}