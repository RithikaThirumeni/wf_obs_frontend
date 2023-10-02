import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Title from './Title';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export default function Chart() {
  const theme = useTheme();
  const {state}=useLocation();
  const data = state;
   sessionStorage.setItem("customerID", data.customerID);
   sessionStorage.setItem("emailID", data.emailID);
    sessionStorage.setItem("firstName", data.firstName);
    sessionStorage.setItem("lastName", data.lastName);
    sessionStorage.setItem("phoneNumber", data.phoneNumber);
    sessionStorage.setItem("residentAddress", data.residentAddress);
    sessionStorage.setItem("dateOfBirth", data.dateOfBirth);
    sessionStorage.setItem("password", data.password);
    sessionStorage.setItem("pin", data.pin);
  return (
    <React.Fragment>
      <Title>{data.firstName} {data.lastName}</Title>
      <Typography variant='h6'>Customer Details</Typography>

      <List>
        <ListItem>
          <ListItemText primary='item 1'>Customer ID : {data.customerID}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary='item 1'>Email ID : {data.emailID}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary='item 1'>Ph. No. : {data.phoneNumber}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary='item 1'>Date of Birth : {data.dateOfBirth}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary='item 1'>Resident Address : {data.residentAddress}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText primary='item 1'></ListItemText>
        </ListItem>

      </List>
    </React.Fragment>
  );
}
