import { createContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../api/authApi";

import {
    saveToken,
    getToken,
    removeToken
} from "../utils/storage";

import {
    getEmail,
    getRole,
    isExpired
} from "../utils/jwt";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);

    const [user, setUser] = useState(null);

    const [role, setRole] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = getToken();

        if (storedToken && !isExpired(storedToken)) {

            setToken(storedToken);

            setUser(getEmail(storedToken));

            setRole(getRole(storedToken));

        } else {

            removeToken();

        }

        setLoading(false);

    }, []);

    const login = async (credentials) => {

        const response = await loginUser(credentials);

        const jwt = response.token;

        saveToken(jwt);

        setToken(jwt);

        setUser(getEmail(jwt));

        setRole(getRole(jwt));

        return response;
    };

    const register = async (data) => {

        return await registerUser(data);

    };

    const logout = () => {

        removeToken();

        setToken(null);

        setUser(null);

        setRole(null);

    };

    return (

        <AuthContext.Provider
            value={{

                token,

                user,

                role,

                loading,

                login,

                logout,

                register,

                isAuthenticated: !!token

            }}
        >

            {children}

        </AuthContext.Provider>

    );

}