import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { verifyAccount } from '../../../services/VerifyAccountService';
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
export default function AccountsVerifyTable({accountList}) {
    const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  function handleClick(event, ano) {
    verifyAccount(ano)
    .then((response)=>{
        console.log(response);
        setAlert(true);
        setAlertContent(ano+" "+response.data.responseText);
    })
}
  return (
    
    <React.Fragment>
        
        <TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Account Number</StyledTableCell>
            <StyledTableCell>Account Type</StyledTableCell>
            <StyledTableCell>Open Date</StyledTableCell>
            <StyledTableCell>Credit Card Required</StyledTableCell>
            <StyledTableCell>Debit Card Required</StyledTableCell>
            <StyledTableCell>Account Status</StyledTableCell>
            <StyledTableCell>Enable/Disable</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(accountList)?(accountList.map((item) => (
            <TableRow>
              <TableCell>{item.accountNumber}</TableCell>
              <TableCell>{item.accountType}</TableCell>
              <TableCell>{item.openDate}</TableCell>
              <TableCell>{item.creditCardReq?(<p>yes</p>):(<p>no</p>)}</TableCell>                         
              <TableCell>{item.debitCardReq?(<p>yes</p>):(<p>no</p>)}</TableCell>
              <TableCell>{item.activeStatus?(<Typography sx={{color:'green'}}>Active</Typography>):(<Typography sx={{color:'red'}}>Disabled</Typography>)}</TableCell>
              <TableCell><Button type="submit" onClick={(event)=>handleClick(event, item.accountNumber)}>Enable/Disable</Button></TableCell>
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      </TableContainer>
      {alert?(<Typography>{alertContent}</Typography>):null}
    </React.Fragment>
  );
}
