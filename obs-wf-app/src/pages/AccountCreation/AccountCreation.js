import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Select, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { accountCreation } from "../../services/AccountCreationService";

function AccountCreation(props) {
  // props - customerId from dashboard
  const location = useLocation();
  const { customerId } = location.state;
  let cid = customerId.customerId;
  const date = new Date();
  let datestring = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const [account, setAccount] = useState({
    accountType: "",
    accountBalance: 0,
    openDate: datestring,
    customerId: cid,
  });

  function handleChange(e) {
    setAccount({ ...account, accountType: e.target.value });
  }

  function handleSubmit(e) {
    const data = account;
    accountCreation(data)
      .then((res) => {
        console.log(res);
        alert(res.data.responseText);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <center>
        <TextField label="Opening date" disabled value={account.openDate} />
        <InputLabel>Account Type</InputLabel>
        <Select
          label="Account Type"
          value={account.accountType}
          onChange={handleChange}
        >
          <MenuItem value={"Savings Account"}>Savings Account</MenuItem>
          <MenuItem value={"Current Account"}>Current Account</MenuItem>
          <MenuItem value={"Salary Account"}>Salary Account</MenuItem>
        </Select>
        <Button variant="contained" onClick={handleSubmit}>
          Open Account
        </Button>
      </center>
    </>
  );
}

export default AccountCreation;
