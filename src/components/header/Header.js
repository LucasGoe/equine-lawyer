import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContextProvider';
import headerImage from '../../assets/logo/logoo-jansz-small.jpg';
import { ReactComponent as FlagNL } from '../../assets/flags/netherlands.svg';
import { ReactComponent as FlagEN } from '../../assets/flags/united-kingdom.svg';
import content from '../../data/content.json';
import './Header.css';

function Header() {
    const { activeLanguage, toggleLanguage } = useContext(LanguageContext);

    return (
        <>
            <header>
                <nav>
                    <ul>
                        {/*<li>*/}
                        {/*    <NavLink exact to="/home">*/}
                        {/*        {content[activeLanguage].header.menuItems.home}*/}
                        {/*    </NavLink>*/}
                        {/*</li>*/}
                        <li>
                            <NavLink exact to="/about-us">
                                {content[activeLanguage].header.menuItems.aboutUs}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/contact">
                                {content[activeLanguage].header.menuItems.contact}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/login">
                                {content[activeLanguage].header.menuItems.login}
                            </NavLink>
                        </li>
                        <li className="language-switch">
                            <p>{content[activeLanguage].header.changeTo}</p>
                            {activeLanguage === 'nl' ?
                                <FlagEN onClick={toggleLanguage}/> :
                                <FlagNL onClick={toggleLanguage}/>}
                        </li>
                    </ul>
                </nav>
                <div className="image-container">
                    <img src={headerImage} alt="Header logo" className="header-image"/>
                    <h1>{content[activeLanguage].header.title}</h1>
                </div>

            </header>
        </>
    );
}

export default Header;
