import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Box } from '@mui/system';
export default function TransactionsTable({translist}) {
  return (
    <React.Fragment>            
        <Box>
        {/* <ul>{accountSummary?.map(item=>{return <li>{item[0].transactionID}</li>;})}</ul> */}
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Source Account</TableCell>
            <TableCell>Receiver Account</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(translist)?(translist.map((item) => (
            <TableRow>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.transactionDate}</TableCell>
              <TableCell>{item.sourceAccountNumber.accountNumber}</TableCell>
              <TableCell>{item.receiverAccountNumber.accountNumber}</TableCell>                         
              <TableCell>{item.transactionType}</TableCell>
              <TableCell align="right">{item.transactionAmount}</TableCell> 
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      </Box>
    </React.Fragment>
  );
}
