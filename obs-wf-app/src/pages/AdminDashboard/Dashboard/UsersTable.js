import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import { verifyUser } from '../../../services/VerifyUserService';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import styled from '@emotion/styled';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
export default function UsersTable({usersList}) {
  
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  function handleClick(event, cid) {
    verifyUser(cid)
    .then((response)=>{
        console.log(response);
        setAlert(true);
        setAlertContent(cid+" "+response.data.responseText);
    })
}
  return (
    
    <React.Fragment>
        
        <TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell>User Name</StyledTableCell>
            <StyledTableCell>Date of Birth</StyledTableCell>
            <StyledTableCell>Email ID</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Resident City</StyledTableCell>
            <StyledTableCell>Customer Status</StyledTableCell>
            <StyledTableCell>Enable/Disable</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(usersList)?(usersList.map((item) => (
            <TableRow>
              <TableCell>{item.customerID}</TableCell>
              <TableCell>{item.firstName} {item.lastName}</TableCell>
              <TableCell>{item.dateOfBirth}</TableCell>
              <TableCell>{item.emailID}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.residentAddress}</TableCell>
              <TableCell>{item.activeStatus?(<Typography sx={{color:'green'}}>Active</Typography>):(<Typography sx={{color:'red'}}>Inactive</Typography>)}</TableCell>
              <TableCell><Button type="submit" onClick={(event)=>handleClick(event, item.customerID)}>Enable/Disable</Button></TableCell>
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      </TableContainer>  
      {alert?(<Typography>{alertContent}</Typography>):null}
    </React.Fragment>
  );
}