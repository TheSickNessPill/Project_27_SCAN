import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

import {
    API_ROOT, OBJECTSEARCH_HISTOGRAMS_ENDPOINT,
    OBJECTSEARCH_ENDPOINT, SEARCH_GET_DOCUMENTS
} from "./../config.js";

import resultsImage from "./../media/results-image.PNG";
import moveBack from "./../media/whyus-left.PNG";
import moveFront from "./../media/whyus-right.PNG";
import lodingGIF from "./../media/loading.gif";
import documentStubImage from "./../media/document-stub.PNG";

import "./../styles/SearchResults.css";

function SearchResults(props) {
    const searchParams = useSelector((state) => { return state.userInfo.searchParamsData; })

    const [histogramData, setHistogramData] = useState([]);
    const [idsArray, setIdsArray] = useState([]);
    const [docCreated, setDocCreated] = useState(10);
    const [docArray, setDocArray] = useState([]);
    const [variantsCount, setVariantsCount] = useState(0);
    const [sliderItemsLength, setsliderItemsLength] = useState(0);
    const [sliderPosition, setSliderPosition] = useState(0);
    const sliderStep = 12.5;

    const navigate = useNavigate();

    const requestBody = {
        "issueDateInterval": {
            "startDate": searchParams.dateFrom,
            "endDate": searchParams.dateTo
        },
        "searchContext": {
            "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                    {
                        "type": "company",
                        "sparkId": null,
                        "entityId": null,
                        "inn": searchParams.textInn,
                        "maxFullness": true,
                        "inBusinessNews": null
                    }
                ],
                "onlyMainRole": true,
                "tonality": searchParams.textTonality,
                "onlyWithRiskFactors": true,
                "riskFactors": { "and": [], "or": [], "not": [] },
                "themes": { "and": [], "or": [], "not": [] }
            },
            "themesFilter": { "and": [], "or": [], "not": [] }
        },
        "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
        },
        "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
        },
        "similarMode": "duplicates",
        "limit": searchParams.docCount,
        "sortType": "issueDate",
        "sortDirectionType": "desc",
        "intervalType": "month",
        "histogramTypes": [
            "totalDocuments",
            "riskFactors"
        ]
    }

    useEffect(
        () => {
            const token = window.localStorage.getItem("token") || "";
            if ((!token.length) || (!Object.keys(searchParams).length)) { navigate("/searchform") }

            console.log(searchParams);
        },
        []
    )

    useEffect(
        () => {
            const token = window.localStorage.getItem("token");
            const requestParams = {
                url: `${API_ROOT}${OBJECTSEARCH_HISTOGRAMS_ENDPOINT}`,
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: requestBody
            }
            axios(requestParams)
                .then(
                    (response) => {
                        console.log("response_HISTOGRAMS_ENDPOINT");
                        console.log(response.data.data)
                        const responseData = response.data.data;
                        const totalDocuments = responseData[0].data.sort(
                            (a, b) => {
                                return new Date(a.date).getTime() - new Date(b.date).getTime();
                            }
                        );
                        const riskFactors = responseData[1].data.sort(
                            (a, b) => {
                                return new Date(a.date).getTime() - new Date(b.date).getTime();
                            }
                        );
                        const sliderElements = [];
                        for (let i = 0; i < totalDocuments.length; i++) {
                            sliderElements.push(
                                {
                                    date: totalDocuments[i].date,
                                    totalDocumentsValue: totalDocuments[i].value,
                                    riskFactorsValue: riskFactors[i].value
                                }
                            )
                        }
                        const resultsSum = sliderElements.reduce(
                            (accumulator, elem) => { return accumulator + elem.totalDocumentsValue; },
                            0
                        );
                        setVariantsCount(resultsSum);
                        setsliderItemsLength(sliderElements.length);
                        return sliderElements;
                    }
                )
                .then(
                    (responseData) => {
                        responseData = responseData.map(
                            (elem) => {
                                const date = new Date(elem.date);
                                const year = date.getFullYear();
                                const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                                elem.date = `${year}-${month}-${day}`;

                                return elem;
                            }
                        )
                        setHistogramData(responseData);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            const token = window.localStorage.getItem("token");
            const requestParams = {
                url: `${API_ROOT}${OBJECTSEARCH_ENDPOINT}`,
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json-patch+json",
                    "Authorization": `Bearer ${token}`
                },
                data: requestBody
            }

            axios(requestParams)
                .then(
                    (response) => {
                        console.log("response_SEARCHOBJECT");
                        const idsArray = response.data.items.flat();
                        return idsArray;
                    }
                )
                .then(
                    (idsArray) => {
                        idsArray = idsArray.map((elem) => { return elem.encodedId })

                        console.log(`IdsList: ${idsArray.length}`);
                        setIdsArray(idsArray);
                    }
                )
                .catch(
                    (error) => {
                        console.log(`Error: ${error}`)
                    }
                )
        },
        []
    )

    useEffect(
        () => {
            if (!idsArray.length) { return undefined; }
            const idsSlice = idsArray.slice(docCreated - 10, docCreated);
            console.log(idsSlice)
            requestDocuments(idsSlice);
        },
        [idsArray]
    )

    function requestDocuments(idsArray) {
        const token = window.localStorage.getItem("token");
        const requestParams = {
            url: `${API_ROOT}${SEARCH_GET_DOCUMENTS}`,
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                "ids": idsArray
            }
        }
        axios(requestParams)
            .then(
                (response) => {
                    console.log("response_SEARCH_GET_DOCUMENTS")
                    const responseDocArray = response.data.documents;
                    console.log(responseDocArray);
                    setDocArray([...docArray, ...responseDocArray])
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }

    function processLoadMoreButton() {
        const idsSlice = idsArray.slice(docCreated, docCreated + 10);
        if (!idsSlice.length) { return undefined; }
        console.log(idsSlice);
        requestDocuments(idsSlice);

        setDocCreated(docCreated + 10);
    }

    function sliderMoveFront() {
        if (sliderPosition === -(sliderItemsLength - 8) * sliderStep) { return undefined; }
        else if (sliderItemsLength <= 8) { return undefined; }
        const sliderContainer = document.querySelector(".histogram-data");
        sliderContainer.style.setProperty("transform", `translateX(${sliderPosition - sliderStep}%)`);
        setSliderPosition(sliderPosition - sliderStep);
    }

    function sliderMoveBack() {
        if (sliderPosition === 0) { return undefined; }
        const sliderContainer = document.querySelector(".histogram-data");
        sliderContainer.style.setProperty("transform", `translateX(${sliderPosition + sliderStep}%)`);
        setSliderPosition(sliderPosition + sliderStep);
    }

    return (
        <main>
            <div className="results-decoration">
                <div className="results-decoration-text">
                    <p> ИЩЕМ. СКОРО </p>
                    <p> БУДУТ РЕЗУЛЬТАТЫ </p>
                    <p> Поиск может занять некоторое время, </p>
                    <p> просим сохранять терпение </p>
                </div>
                <div className="results-decoration-image-container">
                    <img className="results-decoration-image" src={resultsImage} />
                </div>
            </div>
            <div className="general-report">
                <p> ОБЩАЯ СВОДКА </p>
                <p> Найдено {variantsCount} вариантов</p>
            </div>
            <div className="search-results-histogram">
                <div className="move-back">
                    <img className="move-back-button" src={moveBack} onClick={() => { sliderMoveBack() }}></img>
                </div>
                <div className="slider-histogram">
                    <div className="row-labels">
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    {
                        sliderItemsLength ?
                            <div className="histogram-data-wrapper">
                                <div className="histogram-data">
                                    {
                                        histogramData.map(
                                            elem =>
                                                <div className="histogram-elem" key={elem.date}>
                                                    <p>{elem.date}</p>
                                                    <p>{elem.totalDocumentsValue}</p>
                                                    <p> {elem.riskFactorsValue} </p>
                                                </div>
                                        )
                                    }
                                </div>
                            </div>
                            :
                            <div className="histogram-loading">
                                <div>
                                    <img src={lodingGIF} />
                                    <p> Загружаем данные</p>
                                </div>
                            </div>
                    }
                </div>
                <div className="move-front">
                    <img className="move-front-button" src={moveFront} onClick={() => { sliderMoveFront(); }}></img>
                </div>
            </div>

            <div className="doc-list-container">
                <p> CПИСОК ДОКУМЕНТОВ </p>
                <div className="doc-grid">
                    {
                        docArray.map(
                            elem =>
                                <div className="document" key={elem.documentId}>
                                    <div className="document-header">
                                        <p>{elem.loadingDate.substring(0, 10).split("-").reverse().join("-")}</p>
                                        <a href={elem.url || "/"} target="_blank" rel="noreferrer noopener"> {elem.sourceName}</a>
                                    </div>
                                    <h3 className="document-title">{elem.title}</h3>
                                    <p className="document-type"> Новость </p>
                                    <img className="document-image" src={documentStubImage} />
                                    <p className="document-text"> ТЕКСТ ЗАГЛУШКА НЕ УДАЛОСЬ ПОЛУЧИТЬ ТЕКСТ ПОДРОБНЕЕ ОТ ЭТОМ В README ЭТОГО ПРОЕКТА</p>
                                    <div className="document-footer">
                                        <a href={elem.url || "/"} target="_blank" rel="noreferrer noopener"> Читать в источнике </a>
                                        <p> 3234 слов </p>
                                    </div>
                                </div>
                        )
                    }
                </div>
                <div className="document-load-more-button-flex">
                    <button className="document-load-more-button" onClick={() => { processLoadMoreButton() }}> Показать больше </button>
                </div>
            </div>
        </main>
    );

}

export default SearchResults;