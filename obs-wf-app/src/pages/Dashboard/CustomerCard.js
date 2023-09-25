import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import ChangePassword from './ChangePassword';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CustomerCard() {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [anchorEl, setAnchorEl] = React.useState("");
  const handleChangePassword = (event) => {
    event.preventDefault();
    setAlert(true);
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" color="text.primary" gutterBottom>
          {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}
        </Typography>

        <Typography variant="h6" component="div">
          Customer ID - {sessionStorage.getItem("customerID")}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {sessionStorage.getItem("activeStatus")?(<p>Inactive</p>):(<p>Active</p>)}
        </Typography>
        <Typography variant="h6">
          Phone Number : {sessionStorage.getItem("phoneNumber")}
          <br/>
          Email : {sessionStorage.getItem("emailID")}
          <br />
          Date of Birth : {sessionStorage.getItem("dateOfBirth")}
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="small" sx={{flex:1}} onClick={handleChangePassword}>Change Password</Button>
      </CardActions>
      <Typography sx={{ p: 2 }}>{!alert?(null):(
            //   <Popover
            //   id='simplle-popover'
            //   open={open}
            //   anchorEl={anchorEl}
            //   onClose={handleClose}
            //   transformOrigin={{
            //     vertical: 'center',
            //     horizontal: 'center',
            //   }}
            // >
              <ChangePassword sx={{flex:1}} alert={alert}></ChangePassword>
            // </Popover>
          )}
      </Typography>
    </Card>
  );
}
