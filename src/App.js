import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
// import Navbar from './components/navbar/Navbar';
import Header from "./components/header/Header";
import Home from './pages/home/Home';
import AboutUs from './pages/aboutUs/AboutUs';
import Profile from './pages/profile/Profile';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from "./pages/register/Register";
import './App.css';

function App() {
    return (
        <Router>
            <>
                <Header/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/about-us">
                            <AboutUs/>
                        </Route>
                        <Route path="/profile">
                            <Profile/>
                        </Route>
                        <Route path="/contact">
                            <Contact/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                    </Switch>
                </div>
            </>
        </Router>
    );
}

export default App;

