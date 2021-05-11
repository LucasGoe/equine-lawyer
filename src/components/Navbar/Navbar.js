import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo/logo-chess-knight.svg';
import './Navbar.css';

// function Navbar({amount}) {
function Navbar() {
    const [click, setClick] = useState(false);

    return (
        <>
            <nav className="navigation-bar">
                <NavLink exact to="/" className="logo" onClick={() => setClick(false)}>
                    <img className="logo" src={Logo} alt="chess-knight-logo"></img>
                </NavLink>
                <ul className={click ? "nav-links" : "nav-links close"}>
                    <li><NavLink
                        to="/about-us"
                        className="item"
                        activeClassName="active-link"
                        onClick={() => setClick(false)}
                    >ABOUT US</NavLink>
                    </li>
                    <li><NavLink
                        to="/contact"
                        className="item"
                        activeClassName="active-link"
                        onClick={() => setClick(false)}
                    >CONTACT</NavLink>
                    </li>
                    <li><NavLink
                        to="/login"
                        className="item"
                        activeClassName="active-link"
                        onClick={() => setClick(false)}
                    >LOGIN</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;


