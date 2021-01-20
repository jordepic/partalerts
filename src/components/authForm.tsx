import react, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { LoadContext } from '../contexts/loadContext';
import { logInEmailPassword, register as registerNetwork} from "../network/auth";
import Cookies from 'universal-cookie';
import { Checkbox, Input, Button, Radio } from 'antd';
import styles from '../styles/authForm.module.css';

const cookies = new Cookies();

const AuthForm = (props: any) => {

    let [form, setForm] = useState({email: '', password: '', cookie: false});
    let [registering, setRegistering] = useState(false);
    let [error, setError] = useState('');

    let auth = useContext(AuthContext);
    let load = useContext(LoadContext);

    const toggleRegister = (e: any) => {
        setRegistering(e.target.value);
    }

    const handleChange = (e: any) => {
        if (e.target.type === "checkbox") {
            setForm({...form, [e.target.name]: e.target.checked});
        }
        else {
            setForm({...form, [e.target.name]: e.target.value});
        }
    }

    const registerOrLogIn = async () => {
        if (registering) {
            await register(); 
        }
        else {
            await logIn();
        }
    }

    const logIn = async () => {
        if (form.email === "" || form.password === "") {
            setError("Make sure email and password are not empty");
        }
        else {
            load.setLoading(true);
            let token = await logInEmailPassword(form.email, form.password, form.cookie);
            load.setLoading(false);
            if (token === "") {
                setError("Invalid email or password");
            }
            else {
                auth.setLoggedIn(true);
                auth.setToken(token);
                props.history.push('/parts');
            }
        }
    }

    const register = async () => {
        if (form.email === "" || form.password === "") {
            setError("Make sure email and password are not empty");
        }
        else {
            load.setLoading(true);
            let token = await registerNetwork(form.email, form.password, form.cookie);
            load.setLoading(false);
            if (token === "") {
                setError("Invalid email or password");
            }
            else {
                auth.setLoggedIn(true);
                auth.setToken(token);
                props.history.push('/parts');
            }
        }
    }

    return(
        <div>
            <Radio.Group onChange={e => toggleRegister(e)} buttonStyle="outline">
                <Radio.Button className={styles.Radio} value={true}>Register</Radio.Button>
                <Radio.Button className={styles.Radio} value={false}>Log In</Radio.Button>
            </Radio.Group>
            <br/>
            <br/>
            {registering ? 
            <div></div>
                :
            <label>
                <Checkbox className={styles.Checkbox} id="remember" type="checkbox" name="cookie" checked={form.cookie} onChange={e => {handleChange(e)}}/>
                Remember me
            </label>
            }
            <Input placeholder="email" bordered={false} className={styles.Input} name="email" type="text" onChange={e => handleChange(e)} />
            <br/>
            <Input.Password placeholder="password" bordered={false} className={styles.Input} name="password" type={registering ? "text" : "password"} onChange={e => handleChange(e)}/>
            <br/>
            <Button className={styles.Button} type="primary" size="large" onClick={async () => await registerOrLogIn()}>{registering ? "Sign Up" : "Log In"}</Button>
            <br/>
            {
                registering ? 
                <div></div>
                    :
                <Button className={styles.Button} type="ghost" size="large" onClick={() => props.history.push('/send-reset-email')}>
                    Forgot password? Reset it.
                </Button>
                
            }
        </div>
    )
}

export default withRouter(AuthForm);