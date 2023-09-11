import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { customerRegister } from "../../services/RegisterService";
import { Login } from "../Login/Login";
import { Home } from "../../components/Home"
export const Register = () => {
    const navigate = useNavigate();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailID, setEmailID] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [pin, setPin] = useState("");
    const [password, setPassword] = useState("");
    const [residentAddress, setResidentAddress] = useState("");

    const emailChangeHandler = (Event) =>{
        setEmailID(Event.target.value);
    };
    const passwordChangeHandler = (Event) =>{
        setPassword(Event.target.value);
    };
    const firstNameChangeHandler = (Event) =>{
        setFirstName(Event.target.value);
    };
    const lastNameChangeHandler = (Event) =>{
        setLastName(Event.target.value);
    };
    const phoneNumberChangeHandler = (Event) =>{
        setPhoneNumber(Event.target.value);
    };
    const residentAddressChangeHandler = (Event) =>{
        setResidentAddress(Event.target.value);
    };
    const pinChangeHandler = (Event) =>{
        setPin(Event.target.value);
    };
    const dateOfBirthChangeHandler = (Event) =>{
        setDateOfBirth(Event.target.value);
    };

    const submitActionHandler = (Event) => {
        const data = {
            "firstName":firstName,
            "lastName":lastName,
            "phoneNumber":phoneNumber,
            "emailID":emailID,
            "residentAddress":residentAddress,
            "dateOfBirth":dateOfBirth,
            "password":password,
            "pin":pin
        }
        customerRegister(data)
            .then((response) => {
                console.log(response);
                alert(response.data);
            })
            .catch( error => {
                alert("Error = "+error);
            });
    };
    return(
        
        <><form>
            <label for="firstname">First name: </label>
            <input type="text" name="firstname" value={firstName} placeholder="Enter First Name"
                onChange={firstNameChangeHandler} required />
            <br />
            <label for="lastname">Last name: </label>
            <input type="text" name="lastname" value={lastName} placeholder="Enter Last Name"
                onChange={lastNameChangeHandler} required />
            <br />
            <label for="email">Email: </label>
            <input type="email" name="email" value={emailID} placeholder="Enter Registered Email ID"
                onChange={emailChangeHandler} required />
            <br />
            <label for="password">Password: </label>
            <input type="password" name="password" value={password} placeholder="Enter Password"
                onChange={passwordChangeHandler} required />
            <br />
            <label for="pin">Pin: </label>
            <input type="number" name="pin" value={pin} placeholder="Enter 4 digit pin"
                onChange={pinChangeHandler} required />
            <br />
            <label for="phoneNumer">PhoneNumner: </label>
            <input type="number" name="phoneNumber" value={phoneNumber} placeholder="Enter Phone Number"
                onChange={phoneNumberChangeHandler} required />
            <br />
            <label for="dateOfBirth">Date of Birth: </label>
            <input type="date" name="dateOfBirth" value={dateOfBirth} placeholder="Enter Date of Birth"
                onChange={dateOfBirthChangeHandler} required />
            <br />
            <label for="address">Resident Address: </label>
            <input type="text" name="address" value={residentAddress} placeholder="Enter Resident Address"
                onChange={residentAddressChangeHandler} required />
            <br />
            <button type="submit" onClick={submitActionHandler}>Register Now</button>
        </form>
        <h4><Link to="/login">Login with Email and Password</Link></h4>
        <h4><Link to="/home">Go to Home</Link></h4>
        </>
        
    
    );

}