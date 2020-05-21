import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'react-context-hook';

const PrivateRoute = ({ component: Component, ...rest }) => { 

  const [isAuthenticated] = useStore('isAuthenticated');

  return(
    <Route {...rest} render={props => {
        return (
            isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
        )
    }} />
  )
}

export default PrivateRoute;