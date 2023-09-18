import React, { useState } from "react";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

export function Home() {
    const [resetPassword, setResetPassword] = useState(false)

    function forgotPasswordBtnClick(val){
        setResetPassword(val)
    }

    return (
        <>
            <div className="home-main">
                <div className='login-topbar'>
                    {
                        resetPassword? <ForgotPassword forgotPasswordBtnClick={forgotPasswordBtnClick} /> : <Login forgotPasswordBtnClick={forgotPasswordBtnClick} />
                    }
                </div>
                <div className="home-register">
                    <Register />
                </div>
            </div>
        </>
    );
}