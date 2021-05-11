import React, { useContext } from 'react';
import content from '../../data/content.json';
import { LanguageContext } from "../../context/LanguageContextProvider";

function Contact() {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <div className="page-container">
            <h2>{content[activeLanguage].contact.title}</h2>
            <p>{content[activeLanguage].contact.introText}</p>
        </div>
    );
}

export default Contact;