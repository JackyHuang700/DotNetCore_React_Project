import axios from 'axios';

export const Auth = {
    isAuthenticated : false,
    authenticate(userName,password,callback){
        axios({       
            url: '/api/WebApi/Login',
            method: 'post',
            data: {
            "UserName":userName,
            "Password":password
          }
          }).then((result) => {
              debugger;
            if(result.data.success){
                this.isAuthenticated =true;
                callback();
            }        
          }).catch((error) => {
            console.error(error)
          });
      
    },
    signout(callback){
        this.isAuthenticated = false;
    }
}