import * as React from 'react';
import MaterialLink from '@mui/material/Link';
import { useNavigate, Link } from "react-router-dom"
import { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { displayAccounts } from '../../../services/DisplayAccountService';
import AccountsVerifyTable from './AccountsVerifyTable';

export default function CustomerAccounts(){
    const [accountList, setAccountList] = useState("");
    const [customerID, setCustomerID] = useState("");
    function handleChangeCID(event) {
        setCustomerID(event.target.value);
    }
    function handleClick(event, cid) {
        displayAccounts(cid)
        .then((response)=>{
            setAccountList(response.data.obj);
            console.log(accountList);
        })
    }
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Customer Accounts
            </Typography>
            <Grid item xs={12} sm={12}>
                <TextField InputLabelProps={{shrink:true}}
                    required
                    fullWidth
                    type='number'
                    id="customerID"
                    label="Customer ID"
                    name="customerID"
                    onChange={handleChangeCID}
                    value={customerID}
                />
            </Grid>
          <Button 
                type="primary"
                onClick={(event)=>handleClick(event, customerID)}
              >
              View All Accounts
            </Button>
            <br></br>
          <AccountsVerifyTable accountList={accountList}></AccountsVerifyTable>
        </React.Fragment>
    );
}