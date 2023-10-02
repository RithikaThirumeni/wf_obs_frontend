import React from "react";
import { useLocation, Link } from "react-router-dom";
import { displayAccounts } from "../services/DisplayAccountService";
export function DisplayAccountBalance(){
    const {state}=useLocation();
    const data = state;
    const balance=data.balance.obj;
    const accountNumber = data.accountNumber;
    console.log(data);
    return (
        <div>
            <h2>Welcome {sessionStorage.getItem("firstName")} {sessionStorage.getItem("lastName")}</h2>
            <h4>Customer ID : {sessionStorage.getItem("customerID")}</h4>
            <h4>Account Number : {accountNumber}</h4>
            <h4>Account Balance : {balance}</h4>
        </div>
    );
}