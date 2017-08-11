import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';

import { role_Enum } from '../../../EnumScript/GeneralEnumScript.js';



//彈跳視窗
// class MyModal extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             primary: false,
//         };
//         this.togglePrimary = this.togglePrimary.bind(this);
//     }

//     togglePrimary() {
//         this.setState({
//             primary: !this.state.primary
//         });
//     }

//     render() {
//         return (
//             <Modal isOpen={this.state.primary} toggle={this.togglePrimary} className={'modal-primary ' + this.props.className}>
//                 <ModalHeader toggle={this.togglePrimary}>Modal title</ModalHeader>
//                 <ModalBody>
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//                   </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={this.togglePrimary}>Do Something</Button>{' '}
//                     <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>
//         )
//     }
// }




class Role_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            RoleList: [],
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);

    }


    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('api/Role/Role_View').then((result) => {
            // console.log(result.data);
            this.setState({ RoleList: result.data });
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
        document.location.href = `/Role/Edit/${event.currentTarget.getAttribute('data-id')}/${true}`;
    }

    OnClick_Delete(event) {
        document.location.href = `/Role/Delete/${event.currentTarget.getAttribute('data-id')}`;
    }

    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case role_Enum.STOP.value:
                name = role_Enum.STOP.name;
                break;
            case role_Enum.NORMAL.value:
                name = role_Enum.NORMAL.name;
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
            <BootstrapTable data={this.state.RoleList} selectRow={selectRow} striped hover options={options}>
                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                {/* {this.props.display_Id ? <TableHeaderColumn dataField='id'>id</TableHeaderColumn> : null} */}
                {this.props.display_SysId ? <TableHeaderColumn dataField='sysId'>sysId</TableHeaderColumn> : null}
                {this.props.display_name ? <TableHeaderColumn dataField='name'>name</TableHeaderColumn> : null}
                {this.props.display_Priority ? <TableHeaderColumn dataField='priority'>priority</TableHeaderColumn> : null}
                {this.props.display_Status ? <TableHeaderColumn dataField='status' dataFormat={this.Formatter_Status}>ststus</TableHeaderColumn> : null}
                {this.props.display_CreateDate ? <TableHeaderColumn dataField='createDate'>createDate</TableHeaderColumn> : null}
                {this.props.display_CreateUser ? <TableHeaderColumn dataField='createUser'>createUser</TableHeaderColumn> : null}
                {this.props.display_UpdateDate ? <TableHeaderColumn dataField='updateDate'>updateDate</TableHeaderColumn> : null}
                {this.props.display_UpdateUser ? <TableHeaderColumn dataField='updateUser'>updateUser</TableHeaderColumn> : null}


            </BootstrapTable>

        );
    }
}

Role_View.propTypes = {
    display_name: React.PropTypes.bool,
    display_price: React.PropTypes.bool,
    display_button_edit: React.PropTypes.bool,
    display_button_del: React.PropTypes.bool,
};

Role_View.defaultProps = {
    display_name: true,
    display_price: true,
    display_button_edit: true,
    display_button_del: true,

    /**/
    display_Id: true,
    display_SysId: true,
    display_Priority: true,
    display_Status: true,
    display_CreateDate: true,
    display_CreateUser: true,
    display_UpdateDate: true,
    display_UpdateUser: true,
};


export default Role_View;