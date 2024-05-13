import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/istokenvalid.js";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [Info, setInfo ] = useState([]);


    const [Auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    async function updateUserInfo(userInfo) {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `https://api.datavortex.nl/gardengenius/users/${Auth.user.username}`,
                {
                    info: JSON.stringify(userInfo)
                },
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("User information updated successfully:", response.data.info);
            console.log('updateUserInfo user ', Auth.user.username);
            console.log('updateUserInfo IDS ', userInfo);


        } catch (error) {
            console.error("Error updating user information:", error);
        }
    }


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // is de token nog geldig? check met iat helper function

        if (token && isTokenValid(token)) {
            void login(token);

        } else {
            console.log('do nothing after checking useEffect for token');
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            })
        }
    }, []);


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
            );

            console.log("Response userdata: ", response.data);

            if (response.data && response.data.username && response.data.email) {

                setAuth({
                    isAuth: true,
                    user: {
                        username: response.data.username,
                        email: response.data.email,
                        info: response.data.info,
                    },
                    status: 'done',
                });
                console.log('authContext response ', response);
                // console.log('Current user from Auth',response.data.username)
                console.log('Auth content: ', Auth);
                navigate('/search');

            }

        } catch (e) {
            console.error('login error: ', e);
            logout();
        }


        console.log('User logged in');
        // navigate('/search');

    }

    async function getUserInfo() {
        try {
            const token = localStorage.getItem('token');
            const username = Auth.user.username;
            const response = await axios.get(
                `https://api.datavortex.nl/gardengenius/users/${username}/info`,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // return response.data;
            const userInfo = response.data;
            const plantIds = userInfo.map(id => id);

            setInfo(plantIds);

            return plantIds;

        } catch (error) {
            console.error("Error retrieving user information:", error);
        }
    }


    function logout() {
        console.log('User logged out');
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        })
        navigate('/login');
    }


    const AuthData = {
        isAuth: Auth.isAuth,
        user: Auth.user,
        login: login,
        logout: logout,
        updateUserInfo: updateUserInfo,
        getUserInfo: getUserInfo,
        Info: Info,
    };

    return (
        <AuthContext.Provider value={AuthData}>
            {Auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;