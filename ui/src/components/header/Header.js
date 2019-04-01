import React, { Component } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';

class Header extends Component{

    render(){
        return (
        <div className="header">
            <div>
                <img src={ logo } alt="logo"></img>
                <span>
                    Marvel's App <small>by Walter Maniás</small>
                </span>
            </div>
            <div className="login-info">
                <div>
                    <FontAwesomeIcon icon="user" />
                    <span>walter.manias</span>
                </div>
                <div>
                    <Button variant="link" size="sm" block>Logout</Button>
                </div>
            </div>
        </div>)
    }
}

export default Header;