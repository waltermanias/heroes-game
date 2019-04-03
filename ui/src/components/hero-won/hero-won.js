import React, { Component } from 'react';
import './hero-won.css';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
class HeroWon extends Component{
    
    render(){
        if(this.props.winner)
            return (
            <div className="custom-container">
                <div className="custom-body">
                    <div className="hero-winner-thumbnail" style = { {backgroundImage: `url("${ this.props.winner.thumbnail }")` } } >
                    </div>
                    <h1>{ this.props.winner.name } WON!</h1>
                    <small>The game is over...</small>
                </div>
                <Button variant="primary" size="sm" block onClick={ this.props.onRestartGame }>Restart Game</Button>
            </div>
            )
        return null;
    }


}



HeroWon.propTypes = {
    winner : PropTypes.object,
    onRestartGame : PropTypes.func.isRequired
}

export default HeroWon;

