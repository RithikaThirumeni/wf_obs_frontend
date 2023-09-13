import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"
// import { customerRegister } from "../../services/RegisterService";
import { createAccount } from "../../services/CreateAccountService";
import { displayAccounts } from "../../services/DisplayAccountService";

export const CreateAccount = () => {
    const navigate = useNavigate();

    const [accountType, setAccountType] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const [openDate, setOpenDate] = useState("");
    const [creditCardReq, setCreditCardReq] = useState("");
    const [debitCardReq, setDebitCardReq] = useState("");

    const accountTypeChangeHandler = (Event) =>{
        setAccountType(Event.target.value);
    };
    const accountBalanceChangeHandler = (Event) =>{
        setAccountBalance(Event.target.value);
    };
    const creditCardReqChangeHandler = (Event) =>{
        setCreditCardReq(Event.target.checked);
    };
    const debitCardReqChangeHandler = (Event) =>{
        setDebitCardReq(Event.target.checked);
    };
    const openDateChangeHandler = (Event) =>{
        setOpenDate(Event.target.value);
    };
    // var date = new Date();
    // var day = date.getDay;
    // var month = date.getMonth+1;
    // var year = date.getFullYear;
    // if(month<10) month = "0"+month;
    // if(day<10)day = "0"+day;
    // const today = year+"-"+month+"-"+day;
    // setOpenDate(today);
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
    const submitActionHandler = (Event) => {
        const data = {
            "accountType":accountType,
            "accountBalance":accountBalance,
            "openDate":openDate,
            "debitCardReq":debitCardReq,
            "creditCardReq":creditCardReq,
            "customerID": 
            {                
                "customerID":Number(sessionStorage.getItem("customerID")),
                "firstName":sessionStorage.getItem("firstName"),
                "lastName":sessionStorage.getItem("lastName"),
                "phoneNumber":Number(sessionStorage.getItem("phoneNumber")),
                "emailID":sessionStorage.getItem("emailID"),
                "residentAddress":sessionStorage.getItem("residentAddress"),
                "dateOfBirth":sessionStorage.getItem("dateOfBirth"),
                "password":sessionStorage.getItem("password"),
                "pin":Number(sessionStorage.getItem("pin"))
            }
        }
        createAccount(data)
            .then((response) => {
                if(response.data.errors){
                    alert("Error = "+response.data.errors);
                }
                else{
                    alert(response.data);
                }
                console.log(data);
            })
            .catch( error => {
                alert("Error = "+error);
            });
    };
    return(
        
        <><form>
            <label for="Account Type">Account Type: </label>
            <input type="text" name="accountType" value={accountType} placeholder="Enter Type 'savings' or 'fixed-deposit'"
                onChange={accountTypeChangeHandler} required />
            <br />
            <label for="Account Balance">Account Balance: </label>
            <input type="number" name="balance" value={accountBalance} min="0" step="0.01"
                onChange={accountBalanceChangeHandler} required />
            <br />
            <label for="openDate">Account Open Date: </label>
            <input type="date" name="openDate" value={openDate} placeholder="Enter Date of AccountOpening"
                onChange={openDateChangeHandler} required />
            <br />
            <input type="checkbox" id="creditCardReq" value={creditCardReq}
                onClick={creditCardReqChangeHandler} required />
            <label for="creditCardReq">Credit Card Required</label>
            <br />
            <input type="checkbox" id="debitCardRequired" value={debitCardReq}
                onClick={debitCardReqChangeHandler} required />
            <label for="creditCardReq">Debit Card Required</label>
            <br />
            <button type="submit" onClick={submitActionHandler}>Create Account</button>
            <button type="button" onClick={displayAccountsActionHandler}>Display Your Accounts</button>
        </form>

        <h4><Link to="/login">Login with Email and Password</Link></h4>
        <h4><Link to="/home">Go to Home</Link></h4>
        </>
        
    
    );




}