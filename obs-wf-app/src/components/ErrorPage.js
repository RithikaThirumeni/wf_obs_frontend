import React from "react";
import { Link } from "react-router-dom";
import { Home } from "./Home";

export function ErrorPage(){
    return (
        <div className="error page">
            <h3>This Page is not available</h3>
            <h4><Link to="/home">{<Home/>}</Link></h4>
        </div>
    );
}