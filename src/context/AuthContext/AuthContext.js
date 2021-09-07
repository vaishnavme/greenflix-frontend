import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { BASE_URI } from '../../api';
import { errorNotification } from '../../components';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('authUser'))
    );
    // eslint-disable-next-line
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem('authToken'))
    );

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const logInUser = async ({ email, password }) => {
        try {
            const {
                data: { user, success, token }
            } = await axios.post(`${BASE_URI}/user/login`, {
                email,
                password
            });
            setUser(user);
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('authToken', JSON.stringify(token));
            return { user, success };
        } catch (err) {
            errorNotification('Error Occured!');
            console.log(err);
        }
    };

    const signUpUser = async ({ name, email, password }) => {
        try {
            const {
                data: { success, user, token, message }
            } = await axios.post(`${BASE_URI}/user/signup`, {
                name: name,
                email: email,
                password: password
            });
            setUser(user);
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('authToken', JSON.stringify(token));
            return { success, message };
        } catch (err) {
            console.log(err);
            errorNotification('Error Occured while creating account');
        }
    };

    const logOutUser = () => {
        localStorage?.removeItem('authUser');
        localStorage?.removeItem('authToken');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                logInUser,
                signUpUser,
                logOutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
