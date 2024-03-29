import React from "react";
import { Link } from "react-router-dom";

import RequestData from "./RequestData";
import WhyUs from "./WhyUs";

import mainSearchPicture from "./../media/main-search-picture.PNG";

import "./../styles/RootBody.css";

function RootBody(props){
    return (
        <main>
            <RequestData />
            <WhyUs />
        </main>
    )
}

export default RootBody;