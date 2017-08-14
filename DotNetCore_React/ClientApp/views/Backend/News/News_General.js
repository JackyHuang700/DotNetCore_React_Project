import axios from 'axios';

//抓取系統語言
export function Get_Sys_Language(){
    const self = this;
    
        axios({
          url: `/api/Role/Role_View`,
        //   url: `/api/Sys_Language/Sys_Language_View`,
          method: 'GET',
          data: {
          }
        }).then((result) => {
            console.log(`Get_Sys_Language)`, result.data)
          self.setState({
            Sys_LanguageList: result.data
          });
        }).catch((error) => {
          console.log(error)
        });


    
}