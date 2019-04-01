import React, { Component } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
class Login extends Component 
{
    render(){
        return <div className="login">
            <div>
                <div className="login-header">
                    <span>Sign In</span>
                    <small>Do you wanna fight? Just sign in!</small>
                </div>
                <div className="login-body">
                    <Form autoComplete="false">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email address" size="sm"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" size="sm" />
                        </Form.Group>
                        <Button variant="primary" size="sm" type="submit" block>
                            Sign In
                        </Button>
                        
                    </Form>
                </div>                
            </div>
        </div>
    }
}

export default Login;
