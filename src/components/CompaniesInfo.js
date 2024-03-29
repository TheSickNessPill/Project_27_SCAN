import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCompanyLimitReduser, setUsedCompanyCountReduser } from "../state/userInfoSlice";

import { API_ROOT, SETTINGS_ENDPOINT } from "./../config";

import lodingGIF from "./../media/loading.gif";

import "./../styles/CompaniesInfo.css";

function CompaniesInfo(props) {

    const [isSessionExists, setIsSessionExists] = useState("");
    const [usedCompanyCount, setUsedCompanyCount] = useState(-1);
    const [companyLimit, setCompanyLimit] = useState(-1);

    useEffect(
        ()=>{
            const authToken = localStorage.getItem("token") || "";
            if (authToken.length) {
                setIsSessionExists(true);
            }
        },
        []
    );

    useEffect(
        () => {
            const authToken = localStorage.getItem("token") || "";
            console.log(`token: ${authToken.length}`);
            console.log(isSessionExists, usedCompanyCount, companyLimit);
            if (!authToken.length) { return undefined; }
            if ((usedCompanyCount >= 0 && companyLimit >= 0)) {return undefined; }
            const requestSettingsParams = {
                url: `${API_ROOT}${SETTINGS_ENDPOINT}`,
                method: "get",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                }
            }
            axios(requestSettingsParams)
                .then(
                    (response) => {
                        const companiesInfo = response.data;
                        const usedCompanyCount = companiesInfo.eventFiltersInfo.usedCompanyCount;
                        const companyLimit = companiesInfo.eventFiltersInfo.companyLimit
                        setUsedCompanyCount(usedCompanyCount);
                        setCompanyLimit(companyLimit);
                    }
                )
                .catch(
                    (error) => {
                        console.log(`ERROR: ${error}`);
                    }
                );
            console.log("Request companoes INFO");
        },
        []
    );

    return (
        isSessionExists ?
            usedCompanyCount >= 0 && companyLimit >= 0 ?
                <div className="companies-info">
                    <div className="companies-using">
                        <p> Использование компаний: </p>
                        <p className="companies-using-counter"> {usedCompanyCount} </p>
                    </div>

                    <div className="companies-limit">
                        <p> Лимит по компаниям: </p>
                        <p className="companies-limit-counter"> {companyLimit} </p>
                    </div>
                </div >
                :
                <div className="companies-info-gif">
                    <img className="companies-loadong-gif" src={lodingGIF}></img>
                </div>
            :
            undefined
    )
}

export default CompaniesInfo;