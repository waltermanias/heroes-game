
import { baseUrl } from './config';

const movements = {
    PUNCH : 'punch',
    KICK : 'kick',
    SHIELD : 'shield'
}

class HeroService {
    
    static getHeaders()
    {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${ localStorage.getItem('AuthToken') }` 
        }
        return headers;
    }

    static getHero(){    
        return fetch(`${baseUrl}/heroes`).then( resolve =>{
            return resolve.json();
        }).then( data =>{
            return data;
        });
    }

    static createBattle(playerA, playerB){

        let body = JSON.stringify({
            playerA : playerA,
            playerB : playerB
        });

        let options = {
            method : 'POST',
            body,
            headers : this.getHeaders()
        }

        return fetch(`${baseUrl}/battles`, options).then( resolve => {
            return resolve.json();
        })
        .then( data => {
            return data;
        });

    }

    static async sendMovement(battleId, playerId, movement){
        let body = JSON.stringify({
            movement 
        });

        let options = {
            method : 'POST',
            body,
            headers : this.getHeaders()
        }

        return new Promise( function (resolve, reject){

            fetch(`${baseUrl}/battles/${ battleId }/players/${ playerId }/movements`, options)
            .then( response => {
                response.json().then( data => {
                    resolve({ endOfBattle : true });
                }).catch(err => {
                    resolve( { endOfBattle : false } );
                })
            })
            .catch( err => {
                reject(err);
            });

        });

    }

    static getHealthStatus(battleId, playerId){

        let options = {
            method : 'GET',
            headers : this.getHeaders()
        }

        return fetch(`${baseUrl}/battles/${ battleId }/players/${ playerId }/life-status`, options).then( resolve => {
            return resolve.json();
        }).then( data =>{
            return data;
        });
    }

};


export {
    HeroService,
    movements
}