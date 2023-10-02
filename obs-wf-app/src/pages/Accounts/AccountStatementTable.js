import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Title from './Title';
import { Box } from '@mui/system';
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
export default function AccountStatementTable({alert, accountStatement}) {
    console.log(accountStatement);
  return (
    <React.Fragment>
      
      
      {alert
        ?(
            
        <Box>
            <Title>Account Statement</Title>
        <TableContainer component={Paper}>
        <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction ID</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Source Account</StyledTableCell>
            <StyledTableCell>Receiver Account</StyledTableCell>
            <StyledTableCell>Transaction Type</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountStatement?.map((item) => (
            <TableRow>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.transactionDate}</TableCell>
              <TableCell>{item.sourceAccountNumber.accountNumber}</TableCell>
              <TableCell>{item.receiverAccountNumber.accountNumber}</TableCell>                         
              <TableCell>{item.transactionType}</TableCell>
              <TableCell align="right">{item.transactionAmount}</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Box>)
        :(<p>{accountStatement}</p>)
        }
      
    </React.Fragment>
  );
}
