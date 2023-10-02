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
import { transactionSummary } from '../../services/TransactionSummaryService';
import TransactionsTable from './TransactionsTable';

export default function AllTransactions(){
    const [translist, setTranslist] = useState("");
    const [alert, setAlert] = useState("");
    function handleClick(event) {
        setAlert(true);
        transactionSummary(sessionStorage.getItem("customerID"))
        .then((response)=>{
            setTranslist(response.data.obj);
            console.log(translist);
        })
    }
    function handleCancel(event){
        setAlert(false);
    }
    return (
        <React.Fragment>
            <Typography variant="h4" color="text.primary" gutterBottom>
                Transactions made by {sessionStorage.getItem("firstName")}
            </Typography>
            <Grid container spacing={3} sx={{flex:1, overflow:'auto'}}>
                <Grid item xs={12} lg={6} >
            <Button 
                type="submit"
                variant="contained"
                onClick={handleClick}
              >
              Click to View
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
            <br></br>
            <Grid item xs={12}>
          {alert?(<TransactionsTable translist={translist}></TransactionsTable>):null}
          </Grid>
          </Grid>
        </React.Fragment>
    );
}