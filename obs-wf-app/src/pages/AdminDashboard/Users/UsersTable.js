import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { verifyUser } from '../../../services/VerifyUserService';
export default function UsersTable({userList}) {
    const [checked, setChecked] = React.useState(false);
const [data, setData] = React.useState("");
  const handleChange = (cid) => {
    console.log(cid)
    verifyUser(cid)
        .then((response)=>{
            setChecked(true);
            alert(response.data.obj);
            setData(response.data.reponseText);
            console.log(response);
        })
  };
  return (
    
    <React.Fragment>
        <Box>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Active Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(userList)?(userList.map((item) => (
            <TableRow>
              <TableCell>{item.customerID}</TableCell>
              <TableCell>{item.emailID}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>{item.residentAddress}</TableCell>                         
              <TableCell>{item.activeStatus?(<p>yes</p>):(<p>no</p>)}</TableCell>
            </TableRow>
          ))):null}
        </TableBody>
      </Table>
      </Box> 
      {checked?(<p>{data}</p>):null}     
    </React.Fragment>
  );
}

