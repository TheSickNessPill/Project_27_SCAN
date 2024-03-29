import React from "react";
import { Link } from "react-router-dom";

import "./../styles/NavButtons.css";

function NavButtons(props){
    return (
        <nav className="navigation">
            <Link className="nav-link" to="/"> Главная </Link>
            <Link className="nav-link" to="/rates"> Тарифы </Link>
            <Link className="nav-link" to="/faq"> FAQ </Link>
        </nav>
    )
}


export default NavButtons;