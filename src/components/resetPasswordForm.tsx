import react, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LoadContext } from '../contexts/loadContext';
import { resetPassword as resetPasswordNetwork} from "../network/auth";

const ResetPasswordForm = (props: any) => {

    let [form, setForm] = useState({email: '', password: '', code: ''});
    let [error, setError] = useState('');

    let load = useContext(LoadContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "checkbox") {
            setForm({...form, [e.target.name]: e.target.checked});
        }
        else {
            setForm({...form, [e.target.name]: e.target.value});
        }
    }

    const resetPassword = async () => {
        if (form.email === "" || form.password === "" || form.code === '') {
            setError("Make sure email and password are not empty");
        }
        else {
            load.setLoading(true);
            let res = await resetPasswordNetwork(form.email, form.password, parseInt(form.code));
            load.setLoading(false);
            if (res === "Success") {
                props.history.push('/');
            }
            else {
                setError("Make sure that you are using the correct email and activation code");
            }
        }
    }

    return(
        <div>
            <input name="email" type="text" onChange={e => handleChange(e)} />
            <input name="password" type="text" onChange={e => handleChange(e)}/>
            <input name="code" type="number" onChange={e => handleChange(e)}/>
            <input type="submit" style={{
                width:"100px",
                height: "100px"
            }
                }
                onClick={async () => await resetPassword()}>
            </input>
        </div>
    )
}

export default withRouter(ResetPasswordForm);