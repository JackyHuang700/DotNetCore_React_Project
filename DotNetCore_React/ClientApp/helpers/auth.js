import axios from 'axios';
import history from '../history';

export class AuthModule {
    constructor(){
        this.SESSION_TOKEN_KEY = 'reacttoekn_9e209od';
        this.isAuthenticated = false;
        this.userData = null;
        this.check();
    }

    check(){
        let tryData = localStorage.getItem(this.SESSION_TOKEN_KEY);
        if(tryData){
            let mydata = JSON.parse(tryData);
            this.userData = mydata;
            this.isAuthenticated = true;
        }
    }

    authenticate(userName,password,callback){
        axios({       
            url: '/api/WebApi/Login',
            method: 'post',
            data: {
            "UserName":userName,
            "Password":password
          }
          }).then((result) => {
            if(result.data.success){
                this.isAuthenticated =true;
                localStorage.setItem(this.SESSION_TOKEN_KEY,JSON.stringify(result.data.message));
                if(callback){
                    return callback();
                }
            }
            alert(result.data.message);
          }).catch((error) => {
            console.error(error)
        });      
    };

    signout(callback){
        this.isAuthenticated = false;
        localStorage.clear();
        if(callback) callback();
        history.push('/Login');
    };
}

export const Auth = new AuthModule();