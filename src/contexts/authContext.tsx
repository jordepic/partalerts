import react, {useState} from 'react';

export interface AuthContextData {
    loggedIn: boolean,
    token: string,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

export const AuthContext = react.createContext<AuthContextData>({
    loggedIn: false,
    token: '',
    setLoggedIn: () => {},
    setToken: () => {}
});