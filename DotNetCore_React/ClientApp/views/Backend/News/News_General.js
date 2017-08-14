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
            Sys_Language_List: result.data
          });
        }).catch((error) => {
          console.log(error)
        });


    
}


export function GetData() {
    const self = this;
    
        axios({
          url: `/api/News/Get_News?id=${this.props.match.params.id}`,
          method: 'GET',
          data: {
          }
        }).then((result) => {
          // console.log(result.data);
          self.setState({
            News: result.data
          });
        }).catch((error) => {
          console.log(error)
        });
}