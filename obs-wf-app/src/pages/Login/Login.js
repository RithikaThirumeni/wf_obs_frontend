import { useNavigate } from "react-router-dom"
import { customerLogin } from "../../services/LoginService";
import React, { useState } from 'react';
export const Login = () => {
    const navigate = useNavigate();
    const [emailID, setEmailID] = useState("");
    const [password, setPassword] = useState("");

    const emailChangeHandler = (Event) =>{
        setEmailID(Event.target.value);
    };
    const passwordChangeHandler = (Event) =>{
        setPassword(Event.target.value);
    };
    const submitActionHandler = (Event) => {
        const data = {
            "emailID":emailID,
            "password":password
        }
        customerLogin(data)
            .then((response) => {
                // console.log(response);
                // alert("Customer ID = "+response.data.customerID);
                if(response.data){
                    navigate("/dashboard", {
                        state: {
                        customerID: response.data.obj.customerID, 
                        emailID: response.data.obj.emailID,
                        firstName: response.data.obj.firstName,
                        lastName: response.data.obj.lastName,
                        phoneNumber: response.data.obj.phoneNumber,
                        residentAddress: response.data.obj.residentAddress,
                        dateOfBirth: response.data.obj.dateOfBirth,
                        password: response.data.obj.password,
                        pin: response.data.obj.pin 
                    }});
                    navigate(0);
                }
                else alert("Login failed");
            })
    };
    const cancelActionHandler = (Event) => {
        setEmailID("");
        setPassword("");
    };
    const registerActionHandler = (Event) => {
        navigate("/register");
    }
    return(
        <form onSubmit={submitActionHandler}>
            <label htmlFor="email">Email ID:</label>
            <input type="email" id="emailID" 
                value={emailID} placeholder="Enter Registered Email ID" 
                onChange={emailChangeHandler} required></input>
            <br></br>
            <label htmlFor="password">Password</label> 
            <input type="password" id="password" 
                value={password} placeholder="Enter Password" 
                onChange={passwordChangeHandler} required></input>
            <br></br>
            <button type="submit" onClick={submitActionHandler}>Log In</button>
            
            <button type="reset" onClick={cancelActionHandler}>Cancel</button>
            <br></br>
            <button type="submit" onClick={registerActionHandler}>Register Now!</button>
        </form>
    );

}