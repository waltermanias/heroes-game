import React, { Component } from 'react';
import './App.css';
import LoginComponent from './components/login/Login';
import HeaderComponent from './components/header/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import FightComponent from './components/fight/Fight';
import {
  faUser, faLock
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faLock
)

class App extends Component {

  myStyle = {
    backgroundImage: `url(${ require('./assets/background.jpg') })`
  }

  render() {
    return (
      <section className="section" >
        <Container fluid={ true }>
        
        <Row>
          <HeaderComponent></HeaderComponent>
        </Row>
        <Row>
          <Col sm={ 9 }>
            <FightComponent></FightComponent>
          </Col>
          <Col sm={ 3 }>
            <LoginComponent></LoginComponent>
          </Col>
          
        </Row>

        </Container>
      </section>
     
    )

  }

}

export default App;
