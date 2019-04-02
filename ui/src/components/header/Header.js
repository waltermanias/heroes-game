import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from "react-router-dom"
import AuthService from '../../providers/auth-service';
class Header extends Component{

    onLogoutClickHandler = () => {
        AuthService.logout();
        this.props.history.push('/');
    }

    onLoginClickHandler = () => {
        this.props.history.push('/');
    }

    render(){
        return (
        <div className="header">
            <div className='header-body'>
                <img src={ logo } alt="logo"></img>
                <span>
                    Marvel's App <small>by Walter Maniás</small>
                </span>
            </div>
            {!AuthService.isAuthenticated() &&
                <div className="login-info">
                    <button className='logout-button' onClick={ this.onLoginClickHandler }>
                        Login
                    </button>
                </div>
            }
            {AuthService.isAuthenticated() &&
                <div className="login-info">
                    <div>
                        <FontAwesomeIcon icon="user" />
                        <span>{ AuthService.getUsername() }</span>
                    </div>
                    <button className='logout-button' onClick={ this.onLogoutClickHandler }>
                        Logout
                    </button>
                </div>
            }
        </div>)
    }
}

export default withRouter(Header);