import React from 'react';
import { RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './HeroSelector.css';
import { css } from '@emotion/core';
import { HeroService } from '../../providers/hero-service';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class HeroSelector extends React.Component{

    constructor(){
        super();
        this.state= {
            heroes : [],
            text : "",
            isLoading : false,
            showNoResults : false
        }   
    }

    async find(name){
        this.setState({ isLoading : true, showNoResults : false });
        let heroes = await HeroService.getHeroesByName( name );

        let showNoResults = heroes.length===0;

        this.setState( { heroes , isLoading : false , showNoResults } );
    }

    renderHeroItem = ( hero ) => (
        <li key = { hero.id } className="hero-item" onClick={ () => this.props.onSelectedHero( hero ) }> 
            <div className="hero-item-thumbnail" style = { {backgroundImage: `url("${ hero.thumbnail }")` } } ></div>
            <div className="hero-item-body">
                <span>{ hero.name }</span>
            </div>
        </li>
    )

    renderHeroesList = () => (
        <ul>
            { this.state.heroes.map( h => this.renderHeroItem(h) ) }
        </ul>
    )

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
                    <small>We are looking for your hero...</small>
                </div>
            </div>
        );
    }

    render(){
        
        return (
            <div className="hero-selector-container">
                <div className="hero-search-box">
                    <FontAwesomeIcon icon="search" />
                    <input  
                        ref={input => input && input.focus()}
                        type="text" 
                        placeholder="Search your hero..."
                        onKeyUp={ (evt) => { 
                            if(evt.keyCode === 13)
                                this.find( evt.target.value ) 
                        } }/>
                    
                </div>
                {this.state.showNoResults &&
                    <span className="not-found-text">No results found...</span>
                }
                
                {this.state.isLoading &&
                    this.renderLoading()
                }

                {!this.state.isLoading &&
                    this.renderHeroesList()
                }
            </div>
        );
    }

}

HeroSelector.propTypes = {
    onSelectedHero : PropTypes.func.isRequired
}

export default HeroSelector;
