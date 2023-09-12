import React from "react";
import { useLocation, Link } from "react-router-dom";

export function Dashboard() {
  const { state } = useLocation();
  const {
    customerId,
    email,
    firstName,
    lastName,
    phoneNumber,
    address,
    dateOfBirth,
  } = state;
  console.log(customerId);
  console.log(email);
  console.log(firstName);
  console.log(lastName);
  console.log(phoneNumber);
  console.log(address);
  console.log(dateOfBirth);

  return (
    <div className="Dashboard page">
      <h3>Customer Dashboard</h3>
      <p>
        Customer ID : {customerId};<br></br>
        Email ID / Username : {email};<br></br>
        Name : {firstName} {lastName};<br></br>
        Phone Number : {phoneNumber};<br></br>
        Resident Address : {address};<br></br>
        Date Of Birth : {dateOfBirth};<br></br>
      </p>
      <h4>
        <Link to="/home">Go to Home</Link>
        <br />
        <Link to="/createaccount" state={{ customerId: { customerId } }}>
          Create an Account
        </Link>
      </h4>
    </div>
  );
}
