import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../providers/auth-service';

export const ProtectedRoute = ( { component : Component, ...rest } ) => {
    return (
        <Route 
            {...rest} 
            render= { (props) => {
                if(AuthService.isAuthenticated())
                    return <Component {...props}/>
                else{
                    return <Redirect to={ 
                        { 
                            pathname : '/', 
                            state : { 
                                from : props.location } 
                            } 
                        }/>
                }
            }}
        />
    )
}