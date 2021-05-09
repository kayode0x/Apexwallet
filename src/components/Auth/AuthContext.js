import { useState, useEffect, createContext } from 'react';
import axios from 'axios'

const AuthContext = createContext();

function AuthContextProvider (props){
    const [loggedIn, setLoggedIn] = useState(undefined);
    const apiURL = 'http://apex-env.eba-xpthp5pi.us-east-2.elasticbeanstalk.com';

    async function getLoggedIn() {
        const loggedInResponse = await axios.get(`${apiURL}/api/v1/auth/loggedin`);
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