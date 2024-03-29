import React from "react";

import logoWhite from "./../media/logo_white.PNG";
import logoGreen from "./../media/logo_green.PNG";


import "./../styles/Logo.css";


function Logo(props){
    if (props.background === "white"){
        console.log("white");
        return <img className="main-logo" src={logoWhite} />;
    }
    else if (props.background === "green"){
        console.log("green");
        return <img className="main-logo" src={logoGreen} />;
    }
    else{
        return <p> Empty logo </p>;
    }
}

export default Logo;