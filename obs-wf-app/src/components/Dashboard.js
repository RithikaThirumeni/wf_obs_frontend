import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { displayAccounts } from "../services/DisplayAccountService";
export function Dashboard(){
    const navigate=useNavigate();
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

    const displayAccountsActionHandler=()=>{
        displayAccounts()
            .then((response)=>{
                navigate("/displayaccounts", {state:
                {
                    "accounts":response.data,
                }});
                navigate(0);
            })
    }

    return (
        <div className="Dashboard page">
            <h3>Customer Dashboard</h3>
            <p>
            Customer ID : {data.customerID};<br></br>
            Email ID / Username : {data.emailID};<br></br>
            Name : {data.firstName} {data.lastName};<br></br>
            Phone Number : {data.phoneNumber};<br></br>
            Resident Address : {data.residentAddress};<br></br>
            Date Of Birth : {data.dateOfBirth};<br></br>
            </p>
            <h4><Link to="/home">Go to Home</Link></h4>
            <h4><Link to="/create-account" props={{data: data}}>Create a new Account</Link></h4>
            <button type="button" onClick={displayAccountsActionHandler}>Diplay Accounts</button>
        </div>
    );
}