import Cookies from 'js-cookie';
import react, {useContext, useEffect} from 'react';
import AuthForm from '../components/authForm';
import { AuthContext } from "../contexts/authContext";
import { LoadContext } from '../contexts/loadContext';
import { logInToken } from '../network/auth';

export const HomePage = (props: any) => {

    const auth = useContext(AuthContext);
    const load = useContext(LoadContext);

    const logInWithCookie = async () => {
        load.setLoading(true);
        let token = await logInToken();
        if (token !== "") {
          auth.setLoggedIn(true);
          auth.setToken(token);
          props.history.push('/parts');
        }
      }
    
    useEffect(() => {
        logInWithCookie();
    }, [])
     
    return (
        <div>
            <AuthForm/>
        </div>
    )
}