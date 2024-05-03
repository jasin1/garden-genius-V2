import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [Auth, setAuth] = useState({
        isAuth: false,
        user: {},
    });
    const navigate = useNavigate();

    async function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        console.log('decoded JWT', decodedToken.sub)

        try {
            const response = await axios.get(`https://api.datavortex.nl/gardengenius/users/${decodedToken.sub}`,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // setAuth({
            //     isAuth: true,
            //     user: {
            //         username: '',
            //         email: '',
            //         id: '',
            //     }
            // });
            console.log('authContext response ',response);

        } catch (e) {
            console.error('login error: ', e)

        }


        console.log('User logged in');
        // navigate('/search');

    }

    function logout() {
        console.log('User logged out');
        setAuth({
            isAuth: false,
            user: null,
        })
        navigate('/');
    }

    const AuthData = {
        isAuth: Auth.isAuth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;