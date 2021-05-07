import { useState, useEffect, createContext } from 'react';
import axios from 'axios'

const AuthContext = createContext();

function AuthContextProvider (props){
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInResponse = await axios.get('http://192.168.1.98:9000/api/v1/auth/loggedin');
        setLoggedIn( loggedInResponse.data)
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };