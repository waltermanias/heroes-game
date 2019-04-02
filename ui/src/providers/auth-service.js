import { baseUrl } from './config'; 

let headers = {
    'Content-Type': 'application/json',
}

class AuthService {

    static login(username, password, cb){

        localStorage.removeItem( 'AuthToken' );

       let body = JSON.stringify({
            username,
            password
        });
        let options = {
            method : 'POST',
            body,
            headers
        }
        fetch(`${baseUrl}/login`, options).then( resolve => {

            if(resolve.status===401)
                return cb( new Error('Credentials are not valid') );
            else if( resolve.status === 400 )
                return cb( new Error('Credentials are not valid') );
            else if( resolve.status ===200 )
            {
                return resolve.json().then( data => {
                    
                    localStorage.setItem( 'AuthToken', data.token );
                    if(cb)
                        cb(null);
                });
            }
        })
        
        
    }

    static logout(){
        localStorage.removeItem( 'AuthToken' );
    }

    static isAuthenticated()
    {
        let token = localStorage.getItem('AuthToken');
        if(token)
            return true;
        else
            return false;
    }

}

export default AuthService;