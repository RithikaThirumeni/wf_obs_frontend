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
import Title from '../../Accounts/Title';
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { displayCustomers } from '../../../services/DisplayCustomersService';
import UsersTable from './UsersTable';

export function VerifyUsers(){
    const [userList, setUserList] = useState("");
    function handleClick(event) {
        displayCustomers()
        .then((response)=>{
            setUserList(response.data.obj);
            console.log(userList);
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
              View All Users
            </Button>
            <br></br>
          <UsersTable userList={userList}></UsersTable>
        </React.Fragment>
    );
}