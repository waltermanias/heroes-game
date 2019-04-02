import React from 'react';
import './Home.css';
import { Container, Row, Col } from 'react-bootstrap';
import LoginComponent from '../login/Login';
class HomeComponent extends React.Component{

    render(){
        return (
            <Container>
                <Row>
                    <Col md={ 9 }>
                    </Col>
                    <Col md={ 3 }>
                        <LoginComponent></LoginComponent>
                    </Col>
                </Row>
            </Container>)
    }

}

export default HomeComponent;