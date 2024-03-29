import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { resetStateReduser } from "../state/userInfoSlice";


import Avatar from "./Avatar"

import "./../styles/Session.css";

function Session(props) {

    const localStorage = window.localStorage;
    const token = localStorage.getItem("token") || "";

    function logout(){
        window.localStorage.clear();
        window.location.reload(false);
    }

    return (
        !token.length ?
            <div className="session-in">
                <Link  className="singup-button"> Зарегистрироваться </Link>
                <p className="session-separator"> </p>
                <Link className="login-button" to="/login"> Войти </Link>
            </div>
        :
            <div className="session-out">
                <div>
                    <p className="user-name"> ALEX</p>
                    <button className="logout-button" onClick={()=> {logout()}}> Выйти </button>
                </div>
                <Avatar />
            </div>
    )
}

export default Session;