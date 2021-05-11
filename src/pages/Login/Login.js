import React, { useContext } from 'react';
import content from '../../data/content.json';
import { LanguageContext } from "../../context/LanguageContextProvider";

function Login() {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <div className="page-container">
            <h2>{content[activeLanguage].login.title}</h2>
            <p>{content[activeLanguage].login.introText}</p>
        </div>
    );
}

export default Login;