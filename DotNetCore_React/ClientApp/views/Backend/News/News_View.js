import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import axios from 'axios';

import { news_Enum } from '../../../EnumScript/GeneralEnumScript.js';

export default class News_View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NewsList: [],
        }
        this.buttonFormatter = this.buttonFormatter.bind(this);
        this.GetData = this.GetData.bind(this);

    }


    componentDidMount() {
        this.GetData();
    }

    GetData() {
        const self = this;

        axios.get('/api/News/News_View').then((result) => {
            // console.log(result.data);
            this.setState({ NewsList: result.data });
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
        document.location.href = `/News/Edit/${event.currentTarget.getAttribute('data-id')}`;
    }

    OnClick_Delete(event) {
        document.location.href = `/News/Delete/${event.currentTarget.getAttribute('data-id')}/${true}`;
    }

    //將資訊轉換成中文
    Formatter_Status(cell, row) {
        let name = "";

        switch (`${row.status}`) {
            case news_Enum.STOP.value:
                name = news_Enum.STOP.name;
                break;
            case news_Enum.NORMAL.value:
                name = news_Enum.NORMAL.name;
                break;
            case news_Enum.DELETE.value:
                name = news_Enum.DELETE.name;
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
            <BootstrapTable data={this.state.NewsList} selectRow={selectRow} striped hover options={options}>
                <TableHeaderColumn isKey dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
                {this.props.display_listImage ? <TableHeaderColumn dataField='listImage'>listImage</TableHeaderColumn> : null}
                {this.props.display_title ? <TableHeaderColumn dataField='title'>title</TableHeaderColumn> : null}
                {this.props.display_category ? <TableHeaderColumn dataField='category'>category</TableHeaderColumn> : null}
                {this.props.display_priority ? <TableHeaderColumn dataField='priority'>priority</TableHeaderColumn> : null}
                {this.props.display_startDate ? <TableHeaderColumn dataField='startDate'>startDate</TableHeaderColumn> : null}
                {this.props.display_endDate ? <TableHeaderColumn dataField='endDate'>endDate</TableHeaderColumn> : null}
                {this.props.display_status ? <TableHeaderColumn dataField='status' dataFormat={this.Formatter_Status}>status</TableHeaderColumn> : null}
                {this.props.display_createDate ? <TableHeaderColumn dataField='createDate'>createDate</TableHeaderColumn> : null}
                {this.props.display_createUser ? <TableHeaderColumn dataField='createUser'>createUser</TableHeaderColumn> : null}
                {this.props.display_updateDate ? <TableHeaderColumn dataField='updateDate'>updateDate</TableHeaderColumn> : null}
                {this.props.display_updateUser ? <TableHeaderColumn dataField='updateUser'>updateUser</TableHeaderColumn> : null}
            </BootstrapTable>

        );
    }
}

News_View.propTypes = {
    display_name: React.PropTypes.bool,
    display_button_edit: React.PropTypes.bool,
    display_button_del: React.PropTypes.bool,
};

News_View.defaultProps = {
    display_name: true,
    display_button_edit: true,
    display_button_del: true,

    /* */
    display_listImage: true,
    display_title: true,
    display_category: true,
    display_priority: true,
    display_startDate: true,
    display_endDate: true,
    display_status: true,
    display_createDate: true,
    display_createUser: true,
    display_updateDate: true,
    display_updateUser: true,

};