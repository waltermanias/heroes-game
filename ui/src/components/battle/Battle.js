import React from 'react';
import Hero from '../hero/Hero';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Battle.css';
import { HeroService, movements }  from '../../providers/hero-service';
import HeroWonComponent from '../hero-won/hero-won';
class Battle extends React.Component{

    constructor(){
        super();
        this.state = this.onCreateEmptyState();
    }

    renderWinner = () => {
        return (
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
        )
    }

    render(){

        return <div className="fight">
            {this.state.winner!=null &&
                this.renderWinner()
            }
            {!this.state.winner &&
                <Container>
                    <Row>
                        <Col sm={5}>
                            <Hero 
                                isFighting={ this.state.id.length===0 } 
                                healthStatus={ this.state.playerA.healthStatus }
                                playerId = { this.state.playerA.id }

                                onSelectedHero={ (hero) => this.onPlayerASelected( hero ) } 
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
                                isFighting={ this.state.id.length===0 } 
                                healthStatus={ this.state.playerB.healthStatus }
                                playerId = { this.state.playerB.id }

                                onSelectedHero={ ( hero ) => this.onPlayerBSelected( hero ) } 
                                onPunchHandler = { (playerId) => this.onPunchHandler( playerId ) }
                                onKickHandler = { (playerId) => this.onKickHandler( playerId ) }
                                onShieldHandler = { (playerId) => this.onShieldHandler( playerId ) }
                            >
                            </Hero>
                        </Col>
                        <Col sm={12} className="play-button">
                            {this.canFight() &&
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
        
    canFight()
    {
        let playerAIsSelected = this.state.playerA.hero && this.state.playerA.hero.id>0;
        let playerBIsSelected = this.state.playerB.hero && this.state.playerB.hero.id>0;
        return playerAIsSelected && playerBIsSelected && this.state.id.length===0;
    }

    onPlayerASelected = ( hero ) => {
        let state = {
            playerA : {
                id : "", 
                hero, 
                healthStatus : 100 
            }, 
        }
        this.setState( state );
    }

    onPlayerBSelected = ( hero ) => {
        let state = {
            playerB : { 
                id : "", 
                hero, 
                healthStatus : 100 
            }
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
                canCreateFight : false,
                id : battle.id} 
            );
        });

    }
//#endregion
    
}

export default Battle;