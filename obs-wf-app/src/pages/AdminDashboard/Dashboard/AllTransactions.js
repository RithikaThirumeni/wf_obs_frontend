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
    const [error, setError] = React.useState(false);
    const [errorContent, setErrorContent] = useState("");
    const [errorText, setErrorText] = useState("");
    function handleChangeCID(event) {
        setCustomerID(event.target.value);
    }
    function handleClick(event) {
        transactionSummary(customerID)
        .then((response)=>{
            setTranslist(response.data.obj);
            if(response.data.responseText!="sucessfully retrieved transaction summary"){
                setError(true);
                setErrorContent(response.data.responseText);
            }
            else if(translist.length===0){
                setError(true);
                setErrorContent("Nothing to display");
            }
            else{
                setError(false);
            }
            
            console.log(translist);
        })
        .catch((err)=>{
            setError(true);
            setErrorContent("Server error, Enter a valid customer ID");
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
            {error?errorContent:(<TransactionsTable translist={translist}></TransactionsTable>)}
          
        </React.Fragment>
    );
}