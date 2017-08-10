import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


import axios from 'axios';



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




///

var products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 1,
    name: "Product2",
    price: 80
}];




class Role_View extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
    }


    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

    }

    createCustomDeleteButton = (onBtnClick) => {
        return (
            <button class="danger" onClick={onBtnClick}>Delete</button>
        )
    }

    //切換彈跳視窗
    buttonFormatter() {
        return (
            <div>
                {this.props.display_button_edit ? <Button color="primary" >Edit</Button> : null}
                {this.props.display_button_del ? <Button color="primary" >Delete</Button> : null}
            </div>
        );
    }


    render() {
        const options = {
            deleteBtn: this.createCustomDeleteButton
        };

        const selectRow = {
            mode: 'checkbox'
        };

        return (
            <BootstrapTable data={products} selectRow={selectRow} striped hover options={options} deleteRow>
                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                {this.props.display_name ? <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn> : null}
                {this.props.display_price ? <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn> : null}
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
};


export default Role_View;