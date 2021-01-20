import react, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Layout, Menu } from 'antd';
import styles from "../styles/header.module.css";
import { LoadContext } from '../contexts/loadContext';
import { PartContext } from '../contexts/partContext';
import { logOut as logOutNetwork } from "../network/auth";


export const Header = () => {

    let auth = useContext(AuthContext);
    let load = useContext(LoadContext);
    let part = useContext(PartContext);

    const logOut = async () => {
        load.setLoading(true);
        let msg = await logOutNetwork();
        load.setLoading(false);
        if (msg === "Success") {
            auth.setToken('');
            auth.setLoggedIn(false);
            part.setParts([]);
            part.setPage(1);
            part.setNumPages(1);
            part.setFilterName('');
        }
    }

    return (
        <Layout.Header className={styles.Header}>
            <h1 className={styles.Logo}>Bapcs alerts</h1>
            {auth.loggedIn ? 
                <div className={styles.Menu}>
                    <a className={styles.LogOut} onClick={async () => {await logOut()}}>Log Out</a>
                </div> 
                    : 
                <div></div>
            }
        </Layout.Header>
    )
}