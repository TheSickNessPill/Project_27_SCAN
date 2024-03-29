import React from "react";
import { Link } from "react-router-dom";

import mainSearchPicture from "./../media/main-search-picture.PNG";

import "./../styles/RequestData.css";

function RequestData(props){
    return (
        <div className="request-data">
            <div>
                <p> СЕРВИС ПО ПОИСКУ </p>
                <p> ПУБЛИКАЦИЙ O</p>
                <p> КОМПАНИИ </p>
                <p> ПО ЕГО ИНН  </p>
                <p> Комплексный анализ публикаций, получение данных</p>
                <p> в формате PDF на электронную почту </p>

                <Link className="request-data-button" to="/searchform"> Запросить данные </Link>
            </div>
            <img className="main-search-picture"  src={mainSearchPicture} />
        </div>
    )
}

export default RequestData;