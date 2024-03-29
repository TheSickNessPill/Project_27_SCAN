import React from "react";

import Logo from "./Logo";
import NavButtons from "./NavButtons";
import Session from "./Session";
import CompaniesInfo from "./CompaniesInfo";

import "./../styles/Header.css";


function Header(props) {

    return (
        <React.Fragment>
        <header className="header">
            <Logo background="white" />
            <div className="nav-companies-session">
                <NavButtons />
                <CompaniesInfo />
                <Session />
            </div>
        </header>
        <hr></hr>
        </React.Fragment>
    )
}

export default Header;