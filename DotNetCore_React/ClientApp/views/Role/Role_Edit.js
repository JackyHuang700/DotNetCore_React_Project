import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//編輯與檢視共用
class Role_Edit_Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      is_Edit: false,
    };
    this.GetData = this.GetData.bind(this);
    this.Submit = this.Submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    //

    this.Title = this.Title.bind(this);
  }


  componentDidMount() {
    this.GetData();
  }


  GetData() {
    const self = this;

    axios.get('api/Role/Role_View', {
      id: 'c8cc1bba-6cda-4601-bf97-85ced3f041c9',
    }).then((result) => {
      console.log(result.data);
      this.setState(result.data);
    }).catch((error) => {
      console.log(error)
    });

  }

  Submit(event) {
    const {
      SysId,
      Name,
      Priority,
      Status,
    } = this.state;


    axios({

      url: 'api/Role/Edit',
      method: 'post',
      data: {
        SysId: SysId,
        Name: Name,
        Priority: Priority,
        Status: Status,
      }
    }).then((result) => {

      if (result.data.success) {
        document.location.href = '/#/Role_View'
      }
    }).catch((error) => {
      console.log(error)
    });


    event.preventDefault();
    return false;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  Title() {
    return this.state.is_Edit ?
      "編輯角色" :
      "檢視角色";
  }


  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              {this.Title()}
            </div>
            <div className="card-block">
              <form action="" method="post">
                <input type="hidden" id="Id" name="Id" />

                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="SysId" name="SysId" className="form-control" placeholder="SysId" />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Name" name="Name" className="form-control" placeholder="Name" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Priority" name="Priority" className="form-control" placeholder="Priority" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="Status" name="Status" className="form-control" placeholder="Status" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="CreateDate" name="CreateDate" className="form-control" placeholder="CreateDate" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" id="CreateUser" name="CreateUser" className="form-control" placeholder="CreateUser" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>





                <div className="form-group form-actions">
                  <button type="botton" className="btn btn-sm btn-default" onClick={this.Submit} >確認</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}











export default Role_Edit_Show;

Role_Create.propTypes = {
  Id: React.PropTypes.string,
}


Role_Create.defaultProps = {
  Id: '',
}