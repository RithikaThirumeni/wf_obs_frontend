import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { verifyAccount } from '../../../services/VerifyAccountService';

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
        <Box>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account Number</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>Open Date</TableCell>
            <TableCell>Credit Card Required</TableCell>
            <TableCell>Debit Card Required</TableCell>
            <TableCell>Account Status</TableCell>
            <TableCell>Enable/Disable</TableCell>
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
              <TableCell>{item.activeStatus?(<p>Active</p>):(<p>Disabled</p>)}</TableCell>
              <TableCell><Button type="submit" onClick={(event)=>handleClick(event, item.accountNumber)}>Enable/Disable</Button></TableCell>
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      {alert?(<span>{alertContent}</span>):null}
      </Box>      
    </React.Fragment>
  );
}
