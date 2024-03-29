import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useEffect } from "react";

import { useSelector } from "react-redux";

import Header from "./Header";
import RootBody from "./RootBody";
import Footer from "./Footer";
import OurRates from "./OurRates";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import SearchForm from "./SearchForm";
import SearchResults from "./searchResults";

import "./../styles/App.css";


function App(props){
    const navigate = useNavigate();

    useEffect(
        () => {
            const localStorage = window.localStorage
            const token = localStorage.getItem("token") || "";
            const tokenExpire = localStorage.getItem("tokenExpire") || "";
            if (!(token.length && tokenExpire.length)) { return undefined; }

            const tokenExpireTimestamp = Date.parse(tokenExpire);
            const timestampNow = new Date().getTime();
            // console.log(token.length, tokenExpire, tokenExpireTimestamp, timestampNow)

            if (timestampNow > tokenExpireTimestamp){
                window.localStorage.clear();
                navigate("/login");
                window.location.reload(false);
            }
        },
        []
    )

    return (
        <Routes>
            <Route path="/" element={
                <React.Fragment>
                    <Header />
                    <RootBody />
                    <OurRates />
                    <Footer />
                </React.Fragment>
            } />

            <Route path="/login"  element={
                <React.Fragment>
                    <Header />
                    <LoginForm />
                    <Footer />
                </React.Fragment>
            } />
            <Route path="/searchform" element={
                <React.Fragment>
                    <Header />
                    <SearchForm />
                    <Footer />
                </React.Fragment>
            } />
            <Route path="/searchresults" element={
                <React.Fragment>
                    <Header />
                    <SearchResults />
                    <Footer />
                </React.Fragment>
            } />
        </Routes>
    )
}

export default App;