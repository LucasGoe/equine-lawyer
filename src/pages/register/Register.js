import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import content from '../../data/content.json';
// import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContextProvider';

function Register() {

    const { activeLanguage, toggleLanguage } = useContext(LanguageContext);
    const history = useHistory();
    const { handleSubmit, register } = useForm();
    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const [error, toggleError] = useState(false);


    async function onSubmit(data) {
        console.log(data);

        try {
            const result = await axios.post('http://localhost:3000/register',{
                email: data.email,
                password: data.password,
                username: data.username,
            });
            console.log(result);
            toggleRegisterSuccess(true);
            setTimeout(()=> {
                history.push('/signin');
            }, 2000);
            //  je mag ook direct doorgaan, en laten inloggen
        }
        catch(e) {
            console.error(e)
            toggleError(true);
        }
    }

    return (
        <>
            <h1>{content[activeLanguage].register.title}</h1>
            <p>{content[activeLanguage].register.introText}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email-field">
                    {content[activeLanguage].register.email}
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        {...register("email")}
                    />
                </label>

                <label htmlFor="username-field">
                    {content[activeLanguage].register.username}
                    <input
                        type="text"
                        id="username-field"
                        name="username"
                        {...register("username")}
                    />
                </label>

                <label htmlFor="password-field">
                    {content[activeLanguage].register.password}
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        {...register("password")}
                    />
                </label>
                <button
                    type="submit"
                    className="form-button"
                >
                    {content[activeLanguage].register.buttonText}
                </button>
                {registerSuccess === true && <p>{content[activeLanguage].register.successText}</p>}
                {error && <p>{content[activeLanguage].register.errorText}</p>}
            </form>
            <p>{content[activeLanguage].register.loginText}<Link to="/login">{content[activeLanguage].register.linkText}</Link></p>

        </>
    );
}

export default Register;