import React from "react";
import { useLocation, Link } from "react-router-dom";
import { displayAccounts } from "../services/DisplayAccountService";
export function DisplayAccounts(){
    const {state}=useLocation();
    const data = state;
    const accountlist = data.accounts;
    console.log(data.accounts);
    const listItems = accountlist?.map((account)=> 
        <li>Account Number:{account.accountNumber}, Account Balance:{account.accountBalance}</li>);
    return (
        <div>
            <h2>Welcome {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}</h2>
            <h4>Customer ID : {sessionStorage.getItem("customerID")}</h4>
            <h4>List of Accounts Opened and their balance details</h4>
            <ul>{listItems}</ul>
        </div>
    );
}
