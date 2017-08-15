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
        this.checkLogged();
        let tryData = localStorage.getItem(this.SESSION_TOKEN_KEY);
        if(tryData){
            let mydata = JSON.parse(tryData);
            this.userData = mydata;
            this.isAuthenticated = true;
        }
    }

    getUserName(){
        return this.userData.userName;
    }

    checkLogged(){
        axios({
            url:'/api/WebApi/isLogin',
            method: 'get',
            data:{}
        }).then((result) => {
            if(result.data.success){
                this.writeData(result.data.user);
            }
            else{
                this.signout();
            }
        }).catch((error) => {
            console.error(error)
        });      
    }

    writeData(user){
        this.isAuthenticated =true;
        localStorage.setItem(this.SESSION_TOKEN_KEY,JSON.stringify(user));
    }

    authenticate(userName,password,rememberMe,callback){
        axios({       
            url: '/api/WebApi/Login',
            method: 'post',
            data: {
            "UserName":userName,
            "Password":password,
            "rememberMe":rememberMe
          }
          }).then((result) => {
            if(result.data.success){
                this.writeData(result.data.user);
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
        axios({       
            url: '/api/WebApi/Logout',
            method: 'get',
            data: {}
          }).then((result) => {
            if(result.data.success){
                if(callback){
                    callback();
                }
                history.push('/Login');
            }
          }).catch((error) => {
            console.error(error)
        });      
    };
}

export const Auth = new AuthModule();