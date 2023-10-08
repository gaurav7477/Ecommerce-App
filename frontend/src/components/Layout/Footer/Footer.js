import React from "react";
import "./Footer.css";
import Playstore from "../../../Images/playstore.png";
import Appstore from "../../../Images/Appstore.png";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={Playstore} alt="Playstore" />
                <img src={Appstore} alt="Appstore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>

                <p>Copyrights 2021 &copy; MeAbhiSingh</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://instagram.com/">Facebook</a>
            </div>
        </footer>
    );
};

export default Footer;