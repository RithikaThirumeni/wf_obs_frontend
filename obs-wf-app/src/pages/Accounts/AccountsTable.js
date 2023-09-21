import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Box } from '@mui/system';
export default function AccountsTable({accountList}) {
  return (
    
    <React.Fragment>
        <Box>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>Open Date</TableCell>
            <TableCell>Credit Card Required</TableCell>
            <TableCell>Debit Card Required</TableCell>
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
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      </Box>      
    </React.Fragment>
  );
}
