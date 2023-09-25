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
    function handleClick(event) {
        transactionSummary()
        .then((response)=>{
            setTranslist(response.data.obj);
            console.log(translist);
        })
    }
    return (
        <React.Fragment>
            <Title>Recent Transactions made by {sessionStorage.getItem("firstName")}</Title>
            <Button 
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="contained"
                onClick={handleClick}
              >
              Click to View
            </Button>
            <br></br>
          <TransactionsTable translist={translist}></TransactionsTable>
        </React.Fragment>
    );
}