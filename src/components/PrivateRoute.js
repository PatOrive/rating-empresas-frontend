import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

// props = { children, exact, path }  others = { exact, path }
export function PrivateRoute({ children, allowedRoles, ...others }) {
    const { role } = useAuth();

    return (
        <React.Fragment>
            {allowedRoles.includes(role) ? (
                <Route {...others}>{children}</Route>
            ) : (
                    <Redirect to="/account/login" />
                )}
        </React.Fragment>
    );
}


