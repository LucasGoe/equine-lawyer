import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

// STAPPENPLAN:
// CONTEXT
// 1. AuthContext maken met createContext
// 2. AuthContextProvider functie component bouwen met daarin:
//    * Het echte AuthContext.Provider component
//    * Geef een data object mee via de value={} property in de .Provider
//    * Stukje state etc.
// 3. Wikkelen we de Provider om <App> heen in index.js

// AUTHENTICATIE
// 1. Bedenk welke data je in de context beschikbaar moet stellen en maak daar een raamwerkje voor (login, loguit, state)
// 2. Maak de state aan en de lege functies
// 3. Plaats de state en functies in een data object en geef die mee via de value={} prop
// 4. Test de context door een component aan te melden op de context met alles = useContext(AuthContext)
// 5. Inlogfunctie: geef de JWT token door aan de inlogfunctie en zet 'm vanuit de provider in localStorage
// 6. Redirect ook vanuit daar door naar de profielpagina


export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const history = useHistory();

    // state voor de gebruikersdata
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    console.log("authState : ", authState)

    async function fetchUserData(jwtToken) {
        // we hebben de JWT token nodig om daaruit de user data te halen
        // Hier geberuken we de packager jwt-decode voor
        console.log("jwtToken : ", jwtToken);
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;
        console.log("JWT decoded : ", decoded)

        // gebruikersdata ophalen
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${userId}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })
            console.log("Data : ", result);

            // die data gebruiken we om de context te vullen
            setAuthState({
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });

        } catch(e) {
            console.error(e)
        }}

    // wanneer de applicatie geladen wordt willen we checken of er een token is, en als die er is maar er is geen gebruiker,
    // dan willen we alsnog de gebruikersdata ophalen
    useEffect(()=>{
        // is er een token in de local storage?
        const token = localStorage.getItem('token')

        // is er geen user aanwezig in de context?
        // if(token !== undefined && authState.user === null)
        if (token !== null && authState.user === null)
        {
            // haal gebruikersdata op
            fetchUserData(token);

        } else {
            // zo nee, dan geen user, maar wel status op done
            setAuthState({
                user: null,
                status: 'done',
            });
        }
    },[]);

    async function loginFunction(jwtToken) {
        console.log("AuthContext.js jwtToken ? :", jwtToken);
        // we hebben de JWT token nodig om daaruit de user ID te halen
        // Hier gebruiken we de package jwt-decode
        // const decoded = jwt_decode(jwtToken);
        // const userId = decoded.sub;
        // console.log("DECODED JWT: ", decoded)

        // JWT token in de localStorage zetten
        localStorage.setItem('token', jwtToken);
        
        // gebruikersdata ophalen
        fetchUserData(jwtToken);

        history.push('/profile');


        // axios, async, try, catch, request maken
        // try {
        //     const result = await axios.get(`http://localhost:3000/600/users/${userId}`,{
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${jwtToken}`,
        //         }
        //     })
        //     console.log("what result? : ", result);
        //     setAuthState({
        //         user: {
        //             username: result.data.username,
        //             email: result.data.email,
        //             id: result.data.id,
        //         },
        //         status: 'done',
        //     });
        //
        //     // doorlinken naar de profielpagina
        //     history.push('/profile');
        //
        // } catch(e) {
        //     console.error(e)
        // }

        // die dat gebruiken om de context te vullen

    }

    // uitlog functie
   function logoutFunction() {
        console.log("logout! aangeroepen?")
        // leeghalen van de localStorage (met localStorage.clear())
        localStorage.clear();
        // user in de Context weer op 'null' zetten

        history.push('/login');
    }

    // omdat de authState een object is en we nog steeds gebruik willen maken
    // van de automatsche state updates zullen we de autState "spreaden"
    const data = {
        ...authState,
        login: loginFunction,
        logout: logoutFunction,
    }

    console.log("data in AuthContext.js ?", data)

    return (
    <AuthContext.Provider value={data}>
        {authState.status === 'done'
            ? children
            : <p>Loading...</p>
        }
    </AuthContext.Provider>
    );
}

export default AuthContextProvider;