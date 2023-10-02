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
import { displayAccounts } from '../../services/DisplayAccountService';
import AccountsTable from './AccountsTable';

export function AllAccounts(){
    const [accountList, setAccountList] = useState("");
    const [alert, setAlert] = useState("");
    function handleClick(event) {
        setAlert(true);
        displayAccounts(sessionStorage.getItem("customerID"))
        .then((response)=>{
            setAccountList(response.data.obj);
            console.log(accountList);
        })
    }
    function handleCancel(event){
      setAlert(false);
  }
    return (
        <React.Fragment>
          <Typography variant="h4" color="text.primary" gutterBottom>
              Customer Accounts
          </Typography>
          <Grid container spacing={3} sx={{flex:1, overflow:'auto'}}>
                <Grid item xs={12} lg={6} >
                  <Button 
                    type="primary"
                    onClick={handleClick}
                  >
                    View All Accounts
                  </Button>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Button 
                      type="submit"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Cancel View
                  </Button>
                </Grid>
          </Grid>
          <Grid item xs={12}>
          {alert?(<AccountsTable accountList={accountList}></AccountsTable>):null}
          </Grid>
        </React.Fragment>
    );
}