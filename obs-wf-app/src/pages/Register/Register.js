import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { customerRegister } from "../../services/RegisterService";
import { Login } from "../Login/Login";
import { Home } from "../../components/Home"
import SignUp from "./RegisterMUI";
export const Register = () => {
    return(
        <SignUp/>
        
    
    );

}