import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import mooveLeft from "./../media/whyus-left.PNG";
import mooveRight from "./../media/whyus-right.PNG";
import timer from "./../media/whyus-timer.PNG";
import loop from "./../media/whyus-loop.PNG";
import secure from "./../media/whyus-secure.PNG";
import picture1 from "./../media/why-us-picture-1.PNG";

import "./../styles/WhyUs.css";

function WhyUs(props) {
    const cardsToDisplay = 3;
    const [cardsLength, setCardsLength] = useState(undefined);

    useEffect(() => {
        const whyUsCards = document.querySelector(".why-us-slider").childNodes;
        const whyUsCardsLength = whyUsCards.length;
        console.log(whyUsCardsLength)
        setCardsLength(whyUsCardsLength)
    }, [])

    useEffect(() => {
        const mooveLeftButton = document.querySelector(".moove-left");
        mooveLeftButton.addEventListener("click", () => {
            if (cardsLength) {
                const whyUsCardsBlock = document.querySelector(".why-us-slider");
                const deletedChildNode = whyUsCardsBlock.removeChild(whyUsCardsBlock.childNodes[cardsLength - 1]);
                whyUsCardsBlock.insertBefore(deletedChildNode, whyUsCardsBlock.childNodes[0]);
            }
        })

        const mooveRightButton = document.querySelector(".moove-right");
        mooveRightButton.addEventListener("click", () => {
            if (cardsLength) {
                const whyUsCardsBlock = document.querySelector(".why-us-slider");
                const deletedChildNode = whyUsCardsBlock.removeChild(whyUsCardsBlock.childNodes[0]);
                whyUsCardsBlock.appendChild(deletedChildNode);
            }
        })
    }, [cardsLength])


    return (
        <div className="why-us">
            <p> ПОЧЕМУ ИМЕННО МЫ </p>
            <div className="why-us-slider-wrapper">
                <img className="moove-left" src={mooveLeft} />
                <div className="why-us-slider">
                    <div>
                        <img src={timer} />
                        <p>Высокая и оперативная скорость обработки заявки </p>
                    </div>
                    <div>
                        <img src={loop} />
                        <p>Огромная комплексная база данных, обеспечивающия объективный ответ на запрос</p>
                    </div>
                    <div>
                        <img src={secure} />
                        <p>Защита конфиденциальныз сведений, не подлежащих разглашению по фереральному законодательству</p>
                    </div>
                </div>
                <img className="moove-right" src={mooveRight} />
            </div>
            <img src={picture1} />
        </div>
    )
}

export default WhyUs;