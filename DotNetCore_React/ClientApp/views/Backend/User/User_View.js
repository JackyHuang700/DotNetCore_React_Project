import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';

import { user_Enum } from '../../../EnumScript/GeneralEnumScript.js';



class User_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            UserList: [],
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);

    }


    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('api/User/User_View').then((result) => {
            // console.log(result.data);
            this.setState({ UserList: result.data });
        }).catch((error) => {
            console.log(error)
        });
    }

    createCustomDeleteButton = (onBtnClick) => {
        return (
            <button class="danger" onClick={onBtnClick}>Delete</button>
        )
    }


    buttonFormatter(cell, row) {
        return (
            <div>
                {this.props.display_button_edit ? <Button color="primary" data-id={row.id} onClick={this.OnClick_Edit}>Edit</Button> : null}
                {this.props.display_button_del ? <Button color="danger" data-id={row.id} onClick={this.OnClick_Delete}>Delete</Button> : null}
            </div>
        );
    }


    OnClick_Edit(event) {
        document.location.href = `/User/Edit/${event.currentTarget.getAttribute('data-id')}/${true}`;
    }

    OnClick_Delete(event) {
        document.location.href = `/User/Delete/${event.currentTarget.getAttribute('data-id')}`;
    }



    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case user_Enum.STOP.value:
                name = user_Enum.STOP.name;
                break;
            case user_Enum.NORMAL.value:
                name = user_Enum.NORMAL.name;
                break;
            case user_Enum.EMAIL_NO_VAILD.value:
                name = user_Enum.EMAIL_NO_VAILD.name;
                break;
            case user_Enum.FIRST_PASSWORD_UNCHANGE.value:
                name = user_Enum.FIRST_PASSWORD_UNCHANGE.name;
                break;
            case user_Enum.ERROR_COUNT.value:
                name = user_Enum.ERROR_COUNT.name;
                break;


        }

        return name;

    }

    render() {
        const options = {
            deleteBtn: this.createCustomDeleteButton
        };

        const selectRow = {
            mode: 'checkbox'
        };

        return (
            <BootstrapTable data={this.state.UserList} selectRow={selectRow} striped hover options={options}>
                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                {this.props.display_userName ? <TableHeaderColumn dataField='userName'>userName</TableHeaderColumn> : null}
                {this.props.display_roleId ? <TableHeaderColumn dataField='roleId'>roleId</TableHeaderColumn> : null}
                {this.props.display_email ? <TableHeaderColumn dataField='email'>email</TableHeaderColumn> : null}
                {this.props.display_emailComfirmed ? <TableHeaderColumn dataField='emailComfirmed'>emailComfirmed</TableHeaderColumn> : null}
                {this.props.display_firstName ? <TableHeaderColumn dataField='firstName'>firstName</TableHeaderColumn> : null}
                {this.props.display_lastName ? <TableHeaderColumn dataField='lastName'>lastName</TableHeaderColumn> : null}
                {this.props.display_status ? <TableHeaderColumn dataField='status' dataFormat={this.Formatter_Status}>status</TableHeaderColumn> : null}
                {this.props.display_createDate ? <TableHeaderColumn dataField='createDate'>createDate</TableHeaderColumn> : null}
                {this.props.display_createUser ? <TableHeaderColumn dataField='createUser'>createUser</TableHeaderColumn> : null}


                {this.props.display_updateDate ? <TableHeaderColumn dataField='updateDate'>updateDate</TableHeaderColumn> : null}
                {this.props.display_updateUser ? <TableHeaderColumn dataField='updateUser'>updateUser</TableHeaderColumn> : null}
                {this.props.display_failedCount ? <TableHeaderColumn dataField='failedCount'>failedCount</TableHeaderColumn> : null}



            </BootstrapTable>

        );
    }
}

User_View.propTypes = {
    display_button_edit: React.PropTypes.bool,
    display_button_del: React.PropTypes.bool,
};

User_View.defaultProps = {
    display_button_edit: true,
    display_button_del: true,

    /**/
    display_userName: true,
    display_roleId: true,
    display_email: true,
    display_emailComfirmed: true,
    display_firstName: true,
    display_lastName: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,
    display_failedCount: true,

};


export default User_View;