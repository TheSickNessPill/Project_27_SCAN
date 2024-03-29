import React from "react";
import { Link } from "react-router-dom";

import CurrentRate from "./CurentRate";

import beginnerImage from "./../media/rates-beginner.PNG";
import businessImage from "./../media/rates-business.PNG";
import proImage from "./../media/rates-pro.PNG";

import "./../styles/OurRates.css";

function OurRates(props){
    return (
        <div className="rates-main">
            <p> НАШИ ТАРИФЫ </p>
            <div className="rates">
                <div className="rate-beginner">
                    <div className="rate-beginner-header">
                        <div>
                            <p>Beginner</p>
                            <p>Для небольшого исследования </p>
                        </div>
                        <img src={beginnerImage}/>
                    </div>
                    <div className="rate-beginner-body">
                        <div>
                            {false ? <CurrentRate /> : undefined}
                        </div>
                        <div>
                            <p> 799 ₽ </p>
                            <p> 1200 ₽</p>
                        </div>
                        <p> или 150 ₽/мес. при рассрочке на 24 мес. </p>
                        <h2> В тариф входит </h2>
                        <dl>
                            <dt> ✔️ Безлимитная история запросов </dt>
                            <dt> ✔️ Безопасная сделка </dt>
                            <dt> ✔️ Поддержка 24/7 </dt>
                        </dl>
                        {
                            false ?
                            <Link className="rate-info-button-current"> Перейти в личный кабинет </Link>
                            :
                            <Link className="rate-info-button-other"> Подробнее </Link>
                        }
                    </div>
                </div>
                <div className="rate-pro">
                    <div className="rate-pro-header">
                        <div>
                            <p>Pro</p>
                            <p>Для HR и фрилансеров</p>
                        </div>
                        <img src={proImage}/>
                    </div>
                    <div className="rate-pro-body">
                        <div>
                            {false ? <CurrentRate /> : undefined}
                        </div>
                        <div>
                            <p> 1299 ₽ </p>
                            <p> 2600 ₽</p>
                        </div>
                        <p> или 279 ₽/мес. при рассрочке на 24 мес. </p>
                        <h2> В тариф входит </h2>
                        <dl>
                            <dt> ✔️ Все пункты тарифа Beginner </dt>
                            <dt> ✔️ Экспорт истории </dt>
                            <dt> ✔️ Рекомендации по приоритетам </dt>
                        </dl>
                        {
                            false ?
                            <Link className="rate-info-button-current"> Перейти в личный кабинет </Link>
                            :
                            <Link className="rate-info-button-other"> Подробнее </Link>
                        }
                    </div>
                </div>
                <div className="rate-business">
                    <div className="rate-business-header">
                        <div>
                            <p>Business</p>
                            <p>Для корпоративных клиентов </p>
                        </div>
                        <img src={businessImage}/>
                    </div>
                    <div className="rate-business-body">
                        <div>
                            {false ? <CurrentRate /> : undefined}
                        </div>
                        <div>
                            <p> 2389 ₽ </p>
                            <p> 3700 ₽</p>
                        </div>
                        <h2> В тариф входит </h2>
                        <dl>
                            <dt> ✔️ Все пункты тарифа Pro </dt>
                            <dt> ✔️ Безлимитное количество запросов </dt>
                            <dt> ✔️ Приоритетная поддержка</dt>
                        </dl>
                        {
                            false ?
                            <Link className="rate-info-button-current"> Перейти в личный кабинет </Link>
                            :
                            <Link className="rate-info-button-other"> Подробнее </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurRates;