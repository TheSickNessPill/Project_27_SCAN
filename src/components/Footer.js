import React from "react";

import Logo from "./Logo";

import "./../styles/Footer.css";

function Footer(props) {
    return (
        <footer>
            <Logo className="footer-logo" background="green" />
            <div>
                <p>г. Москва, Цветной б-р, 40</p>
                <p> +7 495 771 21 11 </p>
                <p> info@skan.ru </p>
                <br></br>
                <p> Copyright. 2022 </p>
            </div>
        </footer>
    )
}

export default Footer;