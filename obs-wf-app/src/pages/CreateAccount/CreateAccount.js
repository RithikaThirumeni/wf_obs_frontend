import { useState } from "react";
import AccountSignUp from "./CreateAccountMUI";
export const CreateAccount = () => {
    
    // const displayAccountsActionHandler=()=>{
    //     displayAccounts()
    //         .then((response)=>{
    //             console.log(response);
    //             navigate("/displayaccounts", {state:
    //             {
    //                 "accounts":response,
    //             }});
    //             navigate(0);
    //         })
    // }
    return(
        
        // <><form>
        //     <label for="Account Type">Account Type: </label>
        //     <input type="text" name="accountType" value={accountType} placeholder="Enter Type 'savings' or 'fixed-deposit'"
        //         onChange={accountTypeChangeHandler} required />
        //     <br />
        //     <label for="Account Balance">Account Balance: </label>
        //     <input type="number" name="balance" value={accountBalance} min="0" step="0.01"
        //         onChange={accountBalanceChangeHandler} required />
        //     <br />
        //     <label for="openDate">Account Open Date: </label>
        //     <input type="date" name="openDate" value={openDate} placeholder="Enter Date of AccountOpening"
        //         onChange={openDateChangeHandler} required />
        //     <br />
        //     <input type="checkbox" id="creditCardReq" value={creditCardReq}
        //         onClick={creditCardReqChangeHandler} required />
        //     <label for="creditCardReq">Credit Card Required</label>
        //     <br />
        //     <input type="checkbox" id="debitCardRequired" value={debitCardReq}
        //         onClick={debitCardReqChangeHandler} required />
        //     <label for="creditCardReq">Debit Card Required</label>
        //     <br />
        //     <button type="submit" onClick={submitActionHandler}>Create Account</button>
        //     <button type="button" onClick={displayAccountsActionHandler}>Display Your Accounts</button>
        // </form>

        // <h4><Link to="/login">Login with Email and Password</Link></h4>
        // <h4><Link to="/home">Go to Home</Link></h4>
        // </>
        <AccountSignUp/>
    
    );




}