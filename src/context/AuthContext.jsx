import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const [Auth, setAuth] = useState({});
    const navigate = useNavigate();

    function login(){
        console.log('User logged in');
        navigate('/search');

    }

    function logout(){
        console.log('User logged out');
        navigate('/');
    }

    const AuthData ={
        Auth: Auth,
        login: login,
        logout: logout,
    };

    return(
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;