import React, {Component} from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Hero.css';
import { HeroService } from '../../providers/hero-service';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Hero extends Component{

    constructor(){
        super();
        this.state = {
            isLoading : false,
            hero : null
        }
    }

    renderLoading = () => {
        return (
            <div className="waiting-message">
                <RingLoader
                    css={override}
                    sizeUnit={"px"}
                    size={70}
                    color={'#ff001f'}
                    loading={this.state.isLoading}
                />
                
                <div className="waiting-header">
                    <h1>Please wait!</h1>
                </div>
                <div className="waiting-body">
                    <small>The hero is getting ready to fight...</small>
                </div>
            </div>
        );
    }

    renderActions = () => {
        
        if(this.props.isFighting)
            return (
                <div>
                    <Button variant="primary" size="sm" type="submit" block onClick={ () => this.handleHeroSelection(this.props.onSelectedHero) }>Select Hero</Button>
                </div>
            );
            
            return (
                <div>
                    <ProgressBar className="progress" variant="danger" now={ this.props.healthStatus } label={`${ this.props.healthStatus }%`} />
                    <Button variant="primary" size="sm" block onClick={ () => this.handleClick( this.props.onPunchHandler ) }>Punch</Button>
                    <Button variant="primary" size="sm" block onClick={ () => this.handleClick( this.props.onKickHandler ) }>Kick</Button>
                    <Button variant="primary" size="sm" block onClick={ () => this.handleClick( this.props.onShieldHandler ) }>Shield</Button>
                </div>
            );
    }
        
    render(){
    
        return (<div className="hero-container">
            
            {this.state.isLoading &&
                this.renderLoading()
            }

            {!this.state.isLoading &&
                <div className="hero">
                    <div>
                        {this.state.hero &&
                            <div  className="hero-body">
                                <div className="hero-thumbnail" style = { {backgroundImage: `url("${ this.state.hero.thumbnail }")` } } >
                                </div>
                                <h2>{ this.state.hero.name }</h2>
                                <p className="hero-description">
                                    { this.state.hero.description }
                                </p>
                            </div>    
                        }
                    </div>
                    <div className="action-container">
                        { this.renderActions() }
                    </div>
                </div>
            }
            
        </div>)
    }

    //#region Handlers

        handleHeroSelection = (onSelectedHero) => {

            this.setState( { isLoading : true } );

            HeroService.getHero().then(data => {
                let hero = { 
                    name : data.name,
                    description : data.description,
                    thumbnail : data.thumbnail,
                    id : data.id,
                }
                this.setState( { hero, isLoading : false } );

                onSelectedHero( hero );

            });
        }

        handleClick = (cb) => {
            cb( this.props.playerId );
        }

    //#endregion
    
}

Hero.propTypes = {
    isFighting : PropTypes.bool.isRequired,
    healthStatus : PropTypes.number.isRequired,
    playerId : PropTypes.string.isRequired,

    onSelectedHero : PropTypes.func.isRequired,
    onPunchHandler : PropTypes.func.isRequired,
    onKickHandler : PropTypes.func.isRequired,
    onShieldHandler : PropTypes.func.isRequired,
}

export default Hero;