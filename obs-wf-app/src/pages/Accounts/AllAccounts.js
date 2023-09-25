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
    function handleClick(event) {
        displayAccounts(sessionStorage.getItem("customerID"))
        .then((response)=>{
            setAccountList(response.data.obj);
            console.log(accountList);
        })
    }
    return (
        <React.Fragment>
            <Title>Customer Accounts
          </Title>
          <Button 
                type="primary"
                onClick={handleClick}
              >
              View All Accounts
            </Button>
            <br></br>
          <AccountsTable accountList={accountList}></AccountsTable>
        </React.Fragment>
    );
}