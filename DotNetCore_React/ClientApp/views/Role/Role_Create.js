import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import TextInput from '../Components/Forms/TextInput';
import axios from 'axios';

class Role_Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SysId: '',
      Name: '',
      Priority: '',
      Status: 1,
    };

    // this.GetData = this.GetData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleSubmit(event) {
      //we don't want the form to submit, so we prevent the defaul behavior
       event.preventDefault();


///
///
//
///////如何知道全部input是否驗證通過
///
//
//




      // 
      // var contributor = this.state.contributor.trim();
      // if (!contributor) {
      //   return;
      // }

      //if validated
      axios({
        url: 'api/Role/Create',
        method: 'post',
        data: {
          SysId: this.state.SysId,
          Name: this.state.Name,
          Priority: this.state.Priority,
          Status: this.state.Status,
        }
      }).then((result) => {
        if (result.data.success) {
          document.location.href = '/#/Role_View'
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="animated fadeIn row justify-content-center">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              新增角色
              </div>
            <div className="card-block">
              <form action="" method="post">
                <div className="form-group">
                  <div className="input-group">
                    <TextInput
                        uniqueName="SysId"
                        text="Please type in SysId."
                        required={true}
                        minCharacters={6}
                        onChange={this.handleInputChange}
                        errorMessage="SysId is invalid"
                        emptyMessage="SysId is required" />
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <TextInput
                        uniqueName="Name"
                        text="Please type in Name."
                        required={true}
                        minCharacters={6}
                        onChange={this.handleInputChange}
                        errorMessage="Name is invalid"
                        emptyMessage="Name is required" />
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                      <TextInput
                        uniqueName="Priority"
                        text="Please type in Priority."
                        required={true}
                        minCharacters={6}
                        onChange={this.handleInputChange}
                        errorMessage="Priority is invalid"
                        emptyMessage="Priority is required" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                       <TextInput
                        uniqueName="Status"
                        text="Please type in Status."
                        required={true}
                        minCharacters={6}
                        onChange={this.handleInputChange}
                        errorMessage="Status is invalid"
                        emptyMessage="Status is required" />
                    <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  </div>
                </div>
                <div className="form-group form-actions">
                  <Button color="primary" onClick={this.handleSubmit}>確認</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Role_Create;

// Role_Create.propTypes = {
//     Id:  React.PropTypes.string,
// }


// Role_Create.defaultProps = {
//     Id: '',
// }