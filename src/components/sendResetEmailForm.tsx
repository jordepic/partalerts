import react, {useState, useContext} from 'react';
import { withRouter } from 'react-router-dom';
import { LoadContext } from '../contexts/loadContext';
import {sendResetEmail, sendResetEmail as sendResetEmailNetwork} from "../network/auth";

const SendResetEmailForm = (props: any) => {

    let [email, setEmail] = useState('');
    let [error, setError] = useState('');

    let load = useContext(LoadContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const sendResetEmail = async () => {
        if (email === "") {
            setError("Make sure email is not empty");
        }
        else {
            load.setLoading(true);
            let res = await sendResetEmailNetwork(email);
            load.setLoading(false);
            if (res === "Success") {
                props.history.push('/change-password');
            }
            else {
                setError("Email failed to send - account with this email may not exist");
            }
        }
    }

    return (
        <div>
            <input type="text" name="email" value={email} onChange={(e) => handleChange(e)}/>
            <input type="submit" style={{
                width:"100px",
                height: "100px"
            }
                }
                onClick={async () => await sendResetEmail()}>
            </input>
        </div>
    )
}

export default withRouter(SendResetEmailForm);