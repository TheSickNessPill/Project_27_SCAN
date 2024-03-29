import React from "react";
import { useNavigate } from "react-router";

function Logout(props){
    const navigate = useNavigate();
    navigate("/");
}

export default Logout;