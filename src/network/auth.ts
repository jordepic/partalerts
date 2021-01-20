import axios from 'axios';

let url = process.env.REACT_APP_BACKEND_URL as string;

export const logInEmailPassword = async (email: string, password: string, remember: boolean) => {
    try {
        let res = await axios.post(`${url}/login/email`, {email, password, remember}, {withCredentials: true, crossDomain: true} as any) as any;
        console.log(res);
        return res.data.token;
    }
    catch(e) {
        return "";
    }
}

export const logInToken = async () => {
    try {
        let res = await axios.get(`${url}/login/token`, {withCredentials: true, crossDomain: true} as any) as any;
        return res.data.token;
    }
    catch(e) {
        return "";
    }
}

export const logOut = async () => {
    try {
        let res = await axios.get(`${url}/logout`, {withCredentials: true}) as any;
        return res.data.Message;
    }
    catch(e) {
        return "Failure";
    }
}

export const register = async (email: string, password: string, remember: boolean) => {
    try {
        let res = await axios.post(`${url}/register`, {email, password}, {withCredentials: true}) as any;
        if (res.data.Message == "Success") {
            let res = await axios.post(`${url}/login/email`, {email, password, remember}, {withCredentials: true}) as any;
            return res.data.token;
        }
        return "";
    }
    catch(e) {
        return "";
    }
}

export const sendResetEmail = async (email: string) => {
    try {
        let res = await axios.post(`${url}/email`, {email}, {withCredentials: true}) as any;
        if (res.data.Message === "Success") {
            return "Success"
        }
        return "Failure";
    }
    catch(e) {
        return "Failure";
    }
}

export const resetPassword = async (email: string, password: string, code: number) => {
    try {
        let res = await axios.post(`${url}/reset`, {email, password, code}, {withCredentials: true}) as any;
        if (res.data.Message === "Success") {
            return "Success"
        }
        return "Failure";
    }
    catch(e) {
        return "Failure";
    }
}