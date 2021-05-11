import React, { useContext } from 'react';
import content from '../../data/content.json';
import { LanguageContext } from "../../context/LanguageContextProvider";

function Profile() {
    const { activeLanguage } = useContext(LanguageContext);
    return (
        <div className="page-container">
            <h2>{content[activeLanguage].profile.title}</h2>
            <p>{content[activeLanguage].profile.introText}</p>
        </div>
    );
}

export default Profile;