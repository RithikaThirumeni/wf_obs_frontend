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
import { Portal } from '@mui/base/Portal';
import { Box } from '@mui/system';
import { transactionSummary } from '../../../services/TransactionSummaryService';
import TransactionsTable from '../../Dashboard/TransactionsTable';

export default function AllTransactions(){
    const [translist, setTranslist] = useState("");
    const [customerID, setCustomerID] = useState("");
    function handleChangeCID(event) {
        setCustomerID(event.target.value);
    }
    function handleClick(event) {
        transactionSummary(customerID)
        .then((response)=>{
            setTranslist(response.data.obj);
            console.log(translist);
        })
    }
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                All Transactions {customerID}
            </Typography>
            <br></br>
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