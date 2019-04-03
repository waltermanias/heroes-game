import React, { Component } from 'react';
import './App.css';

import HeaderComponent from './components/header/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { Route, withRouter, Switch } from "react-router-dom"
import HomeComponent from './components/home/Home'
import BattleComponent from './components/battle/Battle'
import { ProtectedRoute } from './components/protected-route/ProtectedRoute';
import {
  faUser, faLock, faSearch
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faLock,
  faSearch
)

class App extends Component {

  myStyle = {
    backgroundImage: `url(${ require('./assets/background.jpg') })`
  }

  renderHome = () => {
    return <HomeComponent></HomeComponent>
  }

  renderBattle = () => {
    return <BattleComponent></BattleComponent>
  }

  renderPageNotFound = () => {
    return <div className='page-not-found'>
      <h3>PAGE NOT FOUND</h3>
    </div>
  }

  render() {
    return (
        <section className="section" >
          <Container fluid={ true }>
            <Row>
              <HeaderComponent></HeaderComponent>
            </Row>
            <Row>
              <Col sm={ 12 }>
                <Switch>
                  <Route exact path='/' component = { this.renderHome }/>  
                  <ProtectedRoute exact path='/battles' component = { this.renderBattle } />
                  <Route path='*' component = { this.renderPageNotFound }/>
                </Switch>
              </Col>
            </Row>
          </Container>
        </section>
    )

  }

}

export default  withRouter(App);
