import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import loginPicture from "./../media/login.PNG";
import loginGoogle from "./../media/login-google.PNG";
import loginFacebook from "./../media/login-facebook.PNG";
import loginYandex from "./../media/login-yandex.PNG";

import { API_ROOT, LOGIN_ENDPOINT } from "./../config.js";

import "./../styles/LoginForm.css";


function LoginForm() {
    const [loginText, setLoginText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const [loginErrorText, setLoginErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    const [canGo, setCanGo] = useState(false);

    const navigate = useNavigate();
    //////////////////////////////////////////

    function processLogin(event) {
        let login = event.target.value.trim();

        if (!login.length) {
            setLoginErrorText("");
        }
        else if (/\+?\d{1}\ ?\d{3}\ ?\d{3}\ ?\d{2}\ ?\d{2}/.exec(login) !== null) {
            login = login.trim().replace(/\ /g, "");
            login = login.startsWith("+") ? login : `+${login}`;
            login = `${login.slice(0, 2)} ${login.slice(2, 5)} ${login.slice(5, 8)} ${login.slice(8, 10)} ${login.slice(10, 12)}`;
            event.target.value = login;

            setLoginText(login);
            setLoginErrorText("");
        }
        else if (/.+@.+\..+/.exec(login)) {
            setLoginText(login);
            setLoginErrorText("");
        }
        else if (/^[a-z]{2}_[a-z]+\d+$/.exec(login)) {
            setLoginText(login);
            setLoginErrorText("");
        }
        else {
            setLoginText("");
            setLoginErrorText("Введите корректные данные");
        }
    }

    function processPassword(event) {
        let password = event.target.value.trim();

        if (password.length) {
            setPasswordText(password);
            setPasswordErrorText("");
        }
        else {
            setPasswordText(password);
            setPasswordErrorText("");
        }
    }

    function getLogin() {
        console.log(loginText, "|", passwordText);
        console.log(`${API_ROOT}${LOGIN_ENDPOINT}`);
        const loginURL = `${API_ROOT}${LOGIN_ENDPOINT}`;
        const requestLoginParams = {
            method: "post",
            url: loginURL,
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json-patch+json"
            },
            data: {
                login: loginText,
                password: passwordText
            }
        }
        axios(requestLoginParams).then(
            (response) => {
                const myStorage = window.localStorage;
                const responseData = response.data;
                // myStorage.setItem("lg", btoa(loginText));
                // myStorage.setItem("ps", btoa(passwordText));
                myStorage.setItem("token", responseData.accessToken);
                myStorage.setItem("tokenExpire", responseData.expire);
                console.log("Login: OK");
                navigate("/");
                window.location.reload(false);
            }
        ).catch(
            (error) => {
                console.log("Error", error);
            }
        );
    }
    //////////////////////////////////////////

    useEffect(
        () => {
            const token = window.localStorage.getItem("token") || "";
            if (token.length) {
                navigate("/");
                window.location.reload(false);
            }
        },
        []
    )

    useEffect(
        () => {
            if (loginText.length && passwordText.length) { setCanGo(true); }
            else { setCanGo(false); }
        },
        [loginText, passwordText]
    )

    return (
        <div className="login-screen">
            <img className="login-picture" src={loginPicture} />
            <div className="login-sector">
                <div className="login-buttons">
                    <button className="login-section"> Войти </button>
                    <button className="signup-section" disabled> Зарегестрироваться  </button>
                </div>
                <form className="login-form" name="login">
                    <fieldset>
                        <p>Логин или номер телефона: </p>
                        <input
                            className="login-field"
                            type="text" name="login"
                            required
                            onChange={(event) => { processLogin(event) }}
                        />
                        <p className="login-error"> {loginErrorText} </p>
                    </fieldset>
                    <fieldset>
                        <p> Пароль:  </p>
                        <input
                            className="password-field"
                            type="password"
                            name="password"
                            required
                            onChange={(event) => { processPassword(event) }}
                        />
                        <p className="password-error"> </p>
                    </fieldset>
                </form>
                {
                    canGo ?
                        <button className="submit-button" onClick={() => { getLogin() }}> Войти </button>
                        :
                        <button className="submit-button" disabled> Войти </button>
                }
                <p className="recover-password"> Восстановить пароль </p>
                <div className="login-throgh">
                    <p> Войти через:</p>
                    <div>
                        <button> <img src={loginGoogle} /> </button>
                        <button> <img src={loginFacebook} /> </button>
                        <button> <img src={loginYandex} /> </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;