import React, { Component } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import AuthService from '../../providers/auth-service';
class Login extends Component 
{
    constructor(){
        super();
        this.state = {
            username : '',
            password : '',
            validationMessage : ''
        }
    }

    onSubmitClickHandler = () => {


        AuthService.login(this.state.username, this.state.password, (err)=> {
            if(err)
                this.setState( { validationMessage : err.message } );
            else
                this.props.history.push('/battles');
        });
    }

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
                            <Form.Control type="email" placeholder="Email address" size="sm" onChange={ (evt) => this.setState({ username : evt.target.value }) }/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" size="sm" onChange={ (evt) => this.setState({ password : evt.target.value }) }  />
                        </Form.Group>
                        <Button variant="primary" size="sm" block onClick={ this.onSubmitClickHandler }>
                            Sign In
                        </Button>
                        {this.state.validationMessage.length>0 &&
                            <span className='validation-message'>{ `(*) ${ this.state.validationMessage }`  }</span>
                        }
                    </Form>
                </div>                
            </div>
        </div>
    }
}

export default withRouter(Login);
