import React, {useContext} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export const PrivateRoute = ({component, ...rest}: any) => {

    const auth = useContext(AuthContext) as any;

    const routeComponent = (props: any) => (
        auth.loggedIn
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/'}}/>
    );

    return <Route {...rest} render={routeComponent}/>;
};