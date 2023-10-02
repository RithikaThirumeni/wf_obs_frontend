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
import UsersTable from './UsersTable';
import { displayAllUsers } from '../../../services/GetAllCustomersService';

export default function AllUsers(){
    const [usersList, setUsersList] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [customerID, setCustomerID] = useState("");
    function handleSearch(event, cid) {
        displayAllUsers(cid)
        .then((response)=>{
            console.log(response);
            if(response.data.responseText==="user not found"){
                setAlert(true);
                setAlertContent(response.data.responseText);
            }
            else if(response.data.responseText==="null id, get all"){
                setAlert(false);
                setUsersList(response.data.obj);
            }
            else {
                setAlert(false);
                setUsersList(response.data.obj);
            }
            setAlertContent(response.data.responseText);
        })
    }
    function handleChangeCID(event) {
        setCustomerID(event.target.value);
    }
    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Registered Users
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
                type="primary"
                onClick={(event)=>handleSearch(event, customerID)}
              >
              Find Users
            </Button>
            <br></br>
            {alert?(<Typography variant='h5'>{alertContent}</Typography>):(<UsersTable usersList={usersList}></UsersTable>)}
          
        </React.Fragment>
    );
}