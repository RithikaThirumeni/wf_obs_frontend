import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { verifyUser } from '../../../services/VerifyUserService';
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
        <Box>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Resident City</TableCell>
            <TableCell>Customer Status</TableCell>
            <TableCell>Enable/Disable</TableCell>
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
              <TableCell>{item.activeStatus?(<p>Active</p>):(<p>Inactive</p>)}</TableCell>
              <TableCell><Button type="submit" onClick={(event)=>handleClick(event, item.customerID)}>Enable/Disable</Button></TableCell>
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      {alert?(<span>{alertContent}</span>):null}
      </Box>      
    </React.Fragment>
  );
}