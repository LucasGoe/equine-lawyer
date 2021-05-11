import React, { useContext } from 'react';
// import Logo from '../../assets/logo/logo-chess-knight.svg';
import content from '../../data/content.json';
import { LanguageContext } from "../../context/LanguageContextProvider";

function AboutUs() {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <div className="page-container">
            <h2>{content[activeLanguage].aboutUs.title}</h2>
            {/*<p>Dit is je profielpagina!</p>*/}
            {/*<img src={Logo} alt="logo image"/>*/}
            <p>{content[activeLanguage].aboutUs.introText}</p>
        </div>
    );
}

export default AboutUs;
