import { baseUrl } from './config'; 

let headers = {
    'Content-Type': 'application/json',
}

class AuthService {

    static login(username, password, cb){

       localStorage.clear();

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
                    localStorage.setItem( 'Username' , data.username );
                    if(cb)
                        cb(null);
                });
            }
        })
        
        
    }

    static logout(){
        localStorage.clear();
    }

    static isAuthenticated()
    {
        let token = localStorage.getItem('AuthToken');
        if(token)
            return true;
        else
            return false;
    }

    static getUsername(){
        if(this.isAuthenticated())
        {
            let username = localStorage.getItem('Username');
            return username;
        }
        return null;
    }

}

export default AuthService;