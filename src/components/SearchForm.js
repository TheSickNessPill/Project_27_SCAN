import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSearchParamsDataReduser } from "../state/userInfoSlice";

import searchDataPicture from "./../media/search-data-picture.PNG";

import "./../styles/SearchForm.css";

function SearchForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [textInn, setTextInn] = useState("");
    const [textTonality, setTextTonality] = useState("any");
    const [docCount, setDocCount] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [maxFillFlag, setMaxFillFlag] = useState(true);
    const [businessContextFlag, setBusinessContextFlag] = useState(true);
    const [mainRoleFlag, setMainRoleFlag] = useState(true);
    const [anounseAndKalendarFlag, setAnounseAndKalendarFlag] = useState(true);


    function processINN(event) {
        const text = event.target.value.trim().slice(0, 10);
        if (!text.length) { return undefined; }
        if (/^\d{10}$/.exec(text) !== null) {
            setTextInn(text);
            event.target.value = text;

            const errorElem = document.querySelector(
                ".search-form-query-params-text-input-inn-text-error-on"
            )
            if (errorElem) {
                errorElem.setAttribute("class", "search-form-query-params-text-input-inn-text-error-off");
            }
        }
        else {
            const errorElem = document.querySelector(
                ".search-form-query-params-text-input-inn-text-error-off"
            );
            if (errorElem) {
                errorElem.setAttribute("class", "search-form-query-params-text-input-inn-text-error-on");
            }
        }
    }
    function processTonality(event) {
        const value = event.target.value;
        // setTextTonality
        setTextTonality(value);
    }
    function processDocCount(event) {
        const count = event.target.value.trim().slice(0, 4);

        if (/^\d{1,4}$/.exec(count) !== null) {
            const countNumber = Number(count);
            if (1 <= countNumber && countNumber <= 1000) {
                setDocCount(count);
                event.target.value = count;

                const errorElem = document.querySelector(
                    ".search-form-query-params-text-docount-text-error-on"
                );
                if (errorElem) {
                    errorElem.setAttribute("class", "search-form-query-params-text-docount-text-error-off");
                }
            }
            else {
                setDocCount("");
                const errorElem = document.querySelector(
                    ".search-form-query-params-text-docount-text-error-off"
                );
                if (errorElem) {
                    errorElem.setAttribute("class", "search-form-query-params-text-docount-text-error-on");
                }
                return undefined;
            }
        }
        else {
            setDocCount("");
            const errorElem = document.querySelector(
                ".search-form-query-params-text-docount-text-error-off"
            );
            if (errorElem) {
                errorElem.setAttribute("class", "search-form-query-params-text-docount-text-error-on");
            }
            return undefined;
        }
    }
    function processDateFrom(event) {
        const date = event.target.value;
        setDateFrom(new Date(date).toISOString());
    }
    function processDateTo(event) {
        const date = event.target.value;
        setDateTo(new Date(date).toISOString());
    }
    function processSearchButtonClick(){
        const params = {
            "textInn": textInn,
            "textTonality": textTonality,
            "docCount": docCount,
            "dateFrom": dateFrom,
            "dateTo": dateTo,
            "maxFillFlag": maxFillFlag,
            "businessContextFlag": businessContextFlag,
            "mainRoleFlag": mainRoleFlag,
            "anounseAndKalendarFlag": anounseAndKalendarFlag
        }
        dispatch(setSearchParamsDataReduser(params));
        navigate("/searchresults");
    }

    useEffect(
        () => {
            const token = window.localStorage.getItem("token") || "";
            if (!token.length) { navigate("/"); }
        },
        []
    )

    useEffect(
        () => {
            const params = [
                textInn, textTonality, docCount, dateFrom, dateTo,
                maxFillFlag, businessContextFlag, mainRoleFlag, anounseAndKalendarFlag
            ];
            if (params.every((value) => { return Boolean(value); })) {
                const button = document.querySelector(".search-button")
                button.removeAttribute("disabled");
            }
            else{
                const button = document.querySelector(".search-button")
                button.setAttribute("disabled", "");
            }
        },
        [textInn, docCount, dateFrom, dateTo]
    )

    return (
        <div className="search-form-main">
            <div className="search-form-wrapper">
                <div className="search-form-header-text">
                    <p>НАЙДИТЕ НЕОБХОДИМЫЕ</p>
                    <p>ДАННЫЕ В ПАРУ КЛИКОВ.</p>
                    <p>Задайте параметры поиска</p>
                    <p>Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className="search-form">
                    <form className="search-form-query-params" name="searchText">
                        <div className="search-form-query-params-text">
                            <fieldset>
                                <p className="search-form-query-params-text-input-inn-text"> ИНН компании *</p>
                                <input
                                    className="search-form-query-params-text-input-inn-input"
                                    name="inn-text"
                                    type="text"
                                    placeholder="10 цифр"
                                    onChange={(e) => { processINN(e); }}
                                />
                                <p
                                    className="search-form-query-params-text-input-inn-text-error-off"
                                > Введите корректные данные </p>

                                <p className="search-form-query-params-text-input-tonality-text"> Тональность </p>
                                <select
                                    className="search-form-query-params-text-input-tonality-select"
                                    name="tonality"
                                    defaultValue="any"
                                    onChange={(e) => { processTonality(e); }}
                                >
                                    <option value="any"> Любая </option>
                                    <option value="positive"> Позитивная </option>
                                    <option value="negative"> Негативная </option>
                                </select>

                                <p className="search-form-query-params-text-docount-text"> Количество документов в выдаче *</p>
                                <input
                                    className="search-form-query-params-text-docount-input"
                                    name="doccount"
                                    type="text"
                                    placeholder="От 1 до 1000"
                                    onChange={(e) => { processDocCount(e); }}
                                />
                                <p className="search-form-query-params-text-docount-text-error-off"> Обязательное поле </p>

                                <p className="search-form-query-params-text-range-text"> Диапазон поиска *</p>
                                <div className="search-form-query-params-text-range-wrapper">
                                    <input
                                        className="search-form-query-params-text-range-min"
                                        type="text"
                                        name="range-min"
                                        placeholder="Дата начала"
                                        onFocus={(e) => { e.target.type = "date" }}
                                        onBlur={(e) => { e.target.type = "text" }}
                                        onKeyDown={(e) => { e.target.value = ""; }}
                                        onChange={(e) => { processDateFrom(e); }}
                                    />
                                    <input
                                        className="search-form-query-params-text-range-max"
                                        type="text"
                                        name="range-max"
                                        placeholder="Дата конца"
                                        onFocus={(e) => { e.target.type = "date" }}
                                        onBlur={(e) => { e.target.type = "text" }}
                                        onKeyDown={(e) => { e.target.value = ""; }}
                                        onChange={(e) => { processDateTo(e); }}
                                    />
                                    <p className="search-form-query-params-text-range-text-error"></p>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                    <div className="search-form-query-params-checkbox-and-button">
                        <div className="search-form-query-params-checkbox-wrapper">
                            <form className="search-form-query-params-checkbox" name="searchCheckbox">
                                <fieldset>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="maxFill"
                                            defaultChecked={maxFillFlag}
                                            onChange={() => {setMaxFillFlag(!maxFillFlag);}}
                                        />
                                        <label htmlFor="maxfill"> Признак максимальной полноты </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="businessContext"
                                            defaultChecked={businessContextFlag}
                                            onChange={() => {setBusinessContextFlag(!businessContextFlag);}}
                                        />
                                        <label htmlFor="businessContext"> Упоминания в бизнеc контексте </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="mainRole"
                                            defaultChecked={mainRoleFlag}
                                            onChange={() => {setMainRoleFlag(!mainRoleFlag);}}
                                        />
                                        <label htmlFor="mainRole"> Главная роль в публикации </label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="onlyRisc" disabled />
                                        <label className="label-disabled" htmlFor="onlyRisc"> Публикации только с риск факторами </label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="onlyTechNews" disabled />
                                        <label className="label-disabled" htmlFor="onlyTechNews"> Включать тезнические новости рынков </label>
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="anounseAndKalendar"
                                            defaultChecked={anounseAndKalendarFlag}
                                            onChange={() => {setAnounseAndKalendarFlag(!anounseAndKalendarFlag);}}
                                        />
                                        <label htmlFor="anounseAndKalendar"> Включать анансы и календари </label>
                                    </div>
                                    <div>
                                        <input type="checkbox" name="reportNews" disabled />
                                        <label className="label-disabled" htmlFor="reportNews"> Включать сводки новостей </label>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="search-form-query-params-submit">
                            <button
                                className="search-button"
                                onClick={()=>{processSearchButtonClick();}}
                            > Поиск </button>
                            <p> * Обязательные к заполнению поля</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-form-picture">
                <img src={searchDataPicture}></img>
            </div>
        </div>
    );
}

export default SearchForm;