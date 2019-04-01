import React, { Component } from 'react';
import Hero from '../hero/Hero';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Fight.css';
import { HeroService, movements }  from '../../providers/hero-service';
import HeroWonComponent from '../hero-won/hero-won';
class FightComponent extends Component{

    constructor(){
        super();
        this.state = this.onCreateEmptyState();
    }

    render(){

        return <div className="fight">
            {this.state.showWinner &&
                <Container>
                    <Row>
                        <Col sm={12}>
                            <HeroWonComponent 
                                winner = { this.state.winner }
                                onRestartGame = { () => this.onRestartGame() }
                            >
                            </HeroWonComponent>      
                        </Col>
                    </Row>
                </Container>
            }
            {!this.state.showWinner &&
                <Container>
                    <Row>
                        <Col sm={5}>
                            <Hero 
                                heroSelectionMode={ !this.state.isFighting } 
                                onSelectedHero={ (hero) => this.onPlayerASelected( hero ) } 
                                healthStatus={ this.state.playerA.healthStatus }
                                playerId = { this.state.playerA.id }
                                onPunchHandler = { (playerId) => this.onPunchHandler( playerId ) }
                                onKickHandler = { (playerId) => this.onKickHandler( playerId ) }
                                onShieldHandler = { (playerId) => this.onShieldHandler( playerId ) }
                            >
                            </Hero>
                        </Col>
                        <Col sm={2} className="center-vs">
                            <h1>vs</h1>
                        </Col>
                        <Col sm={5}>
                            <Hero 
                                heroSelectionMode={ !this.state.isFighting } 
                                onSelectedHero={ ( hero ) => this.onPlayerBSelected( hero ) } 
                                healthStatus={ this.state.playerB.healthStatus } 
                                playerId = { this.state.playerB.id }
                                onPunchHandler = { (playerId) => this.onPunchHandler( playerId ) }
                                onKickHandler = { (playerId) => this.onKickHandler( playerId ) }
                                onShieldHandler = { (playerId) => this.onShieldHandler( playerId ) }
                            >
                            </Hero>
                        </Col>
                        <Col sm={12} className="play-button">
                            {this.state.canCreateFight &&
                                <Button variant="primary" size="lg" block onClick={ this.onFightClick } >Fight!</Button>
                            }
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    }

//#region Handlers

    onRestartGame = () => {
        let emptyState = this.onCreateEmptyState();
        this.setState( emptyState );
    }

    onCreateEmptyState = () => {
        let emptyState = {
            id : "",
            canCreateFight : false,
            isFighting : false,
            showWinner : false,
            winner : null,
            playerA : { 
                id : "",
                healthStatus : 100,
                hero : { 
                            name : "", 
                            thumbnail : "", 
                            description : "" 
                } 
            },
            playerB : { 
                id : "",
                healthStatus : 100,
                hero : { 
                            name : "", 
                            thumbnail : "", 
                            description : "" 
                } 
            }
        }
        return emptyState
    } 
        
    

    onPlayerASelected = ( hero ) => {

        let canCreateFight = false;
        if(this.state.playerB.hero.id>0)
            canCreateFight = true;

        let state = {
            playerA : {
                id : "", 
                hero, 
                healthStatus : 100 
            }, 
            canCreateFight
        }

        this.setState( state );

    }

    onPlayerBSelected = ( hero ) => {

        let canCreateFight = false;
        if(this.state.playerA.hero.id>0)
            canCreateFight = true;

        let state = {
            playerB : { 
                id : "", 
                hero, 
                healthStatus : 100 
            }, 
            canCreateFight
        }
        
        this.setState( state );
    }

    onPunchHandler = async(playerId) => {
        HeroService.sendMovement( this.state.id, playerId, movements.PUNCH )
        .then( (data) => {
            this.onUpdateHealthStatus( playerId );
            this.onVerifyWinner( data, playerId );
        });
    }

    onVerifyWinner( data, playerId )
    {        
        if(data.endOfBattle)
        {
            let winner;
            if(playerId === this.state.playerA.id)
                winner = this.state.playerA.hero;
            else
                winner = this.state.playerB.hero;

            this.setState( { 
                showWinner : true,
                winner 
            });
        }       
    }

    onKickHandler = async(playerId) => {
        HeroService.sendMovement( this.state.id, playerId, movements.KICK )
        .then( (data) => {
            this.onUpdateHealthStatus( playerId );
            this.onVerifyWinner( data, playerId );
        });
    }

    onShieldHandler = async(playerId) => {
        HeroService.sendMovement( this.state.id, playerId, movements.SHIELD )
        .then( (data) => {
            this.onUpdateHealthStatus( playerId );
            this.onVerifyWinner( data, playerId );
        });
    }

    onUpdateHealthStatus(playerId){

        // I need to find the opponent health status
        let opponent;
        if( playerId === this.state.playerA.id )
            opponent = this.state.playerB;
        else
            opponent = this.state.playerA;

        HeroService.getHealthStatus( this.state.id, opponent.id )
        .then( (data) => {

            if( opponent.id === this.state.playerA.id )
            {
                let playerA = this.state.playerA;
                playerA.healthStatus = data.healthStatus;
                this.setState( { playerA } );
            }else
            {
                let playerB = this.state.playerB;
                playerB.healthStatus = data.healthStatus;
                this.setState( { playerB } );
            }
        });
    }

    onFightClick = async()=>{

        // create the battle
        let playerA = this.state.playerA.hero.id;
        let playerB = this.state.playerB.hero.id;
        HeroService.createBattle( playerA, playerB ).then( battle => {

            let playerA = this.state.playerA;
            playerA.id = battle.players[0].id;

            let playerB = this.state.playerB;
            playerB.id = battle.players[1].id;

            this.setState({ 
                playerA,
                playerB,
                isFighting : true,
                canCreateFight : false,
                id : battle.id} 
            );
        });

    }
//#endregion
    
}



export default FightComponent;