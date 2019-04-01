
const baseUrl = "http://localhost:3000";    

let headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGQ2Nzk1ZTYzMGQ0MzlmYzgwYzhjNyIsImlhdCI6MTU1NDA4ODk4NiwiZXhwIjoxNTU0MDkyNTg2fQ.cB2I3IJPGbvS_opRMX5Mt4d5msmSLqqQ0Y24h_zpjZk'
}

const movements = {
    PUNCH : 'punch',
    KICK : 'kick',
    SHIELD : 'shield'
}

class HeroService {
    
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
            headers
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
            headers
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
            headers
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