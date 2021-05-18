// import React, { useContext } from 'react';
// import content from '../../data/content.json';
// import { LanguageContext } from "../../context/LanguageContextProvider";
//
// function Login() {
//     const { activeLanguage } = useContext(LanguageContext);
//     return (
//         <div className="page-container">
//             <h2>{content[activeLanguage].login.title}</h2>
//             <p>{content[activeLanguage].login.introText}</p>
//         </div>
//     );
// }
//
// export default Login;




import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import content from '../../data/content.json';
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from '../../context/LanguageContextProvider';

// STAPPEN INLOGGEN
// 1. importeer axios
// 2. async functie maken
// 3. try/catch blok
// 4. in de try: axios post request naar het eindpoint http://localhost:3000/login// --- error state en loading state aanmaken en communiceren aan gebruiker
// 5. het post request bevat het endpoint en het data object met email en wachtwoord
// 6. wat we terugkrijgen is JWT token, die moet in de local storage
// 7. gebruiker doorsturen naar profielpagina
// 8. de gebruikersdata moet in de context geplaatst zodat alle componenten erbij kunnen!

// -----
// 9. Importeer useContext en AuthContext
// 10. Destructure daar de login functie uit
// 11. Roep 'm aan en geef de JWT token mee

function Login() {
    const { activeLanguage, toggleLanguage } = useContext(LanguageContext);
    const { login } = useContext(AuthContext);
    const { handleSubmit, register } = useForm();
    const [authenticationSuccess, toggleAuthenticationSuccess] = useState(false);
    const [error, toggleError] = useState(false);



    async function onSubmit(data) {
        toggleError(false);
        console.log("data before request: ", data);

        try {
            const result = await axios.post('http://localhost:3000/login', data)
            console.log("result after request: ", result);
            login(result.data.accessToken);
            toggleAuthenticationSuccess(true);

        } catch (e) {
            // console.log("catch data : ", data)
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <>
            <h1>{content[activeLanguage].login.title}</h1>
            <p>{content[activeLanguage].login.introText}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                {authenticationSuccess ? (
                    <h2>{content[activeLanguage].login.successText}</h2>
                ) : (
                    <>
                        <label htmlFor="email-field">
                            {content[activeLanguage].login.email}
                            <input
                                type="email"
                                id="email-field"
                                name="email"
                                {...register("email")}
                            />
                        </label>

                        <label htmlFor="password-field">
                            {content[activeLanguage].login.password}
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
                            {content[activeLanguage].login.buttonText}
                        </button>
                        {error && <p>{content[activeLanguage].login.errorText}</p>}
                    </>
                )}
            </form>
            <p>{content[activeLanguage].login.registerText}<Link to="/register">{content[activeLanguage].login.linkText}</Link>{content[activeLanguage].login.registerText2}</p>
        </>
    );
}

export default Login;