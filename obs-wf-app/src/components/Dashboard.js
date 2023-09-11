import React from "react";
import { useLocation, Link } from "react-router-dom";

export function Dashboard(){
    const {state}=useLocation();
    const {customerID, emailID, firstName, lastName, phoneNumber, residentAddress, dateOfBirth} = state;

    return (
        <div className="Dashboard page">
            <h3>Customer Dashboard</h3>
            <p>
            Customer ID : {customerID};<br></br>
            Email ID / Username : {emailID};<br></br>
            Name : {firstName} {lastName};<br></br>
            Phone Number : {phoneNumber};<br></br>
            Resident Address : {residentAddress};<br></br>
            Date Of Birth : {dateOfBirth};<br></br>
            </p>
            <h4><Link to="/home">Go to Home</Link></h4>
        </div>
    );
}