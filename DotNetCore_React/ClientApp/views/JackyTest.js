import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


import axios from 'axios';




///
class Auth_View extends Component {

  componentDidMount() {
    this.GetData();
  }

  GetData() {
    const self = this;
    // axios.get('api/Base/').then((result) => {
    //   console.log(result.data)
    // }).catch((error) => {
    //   console.log(error)
    // });


    // axios.post('api/Base/', {
    //   a: 10
    // }).then((result) => {
    //   console.log(result.data)
    // }).catch((error) => {
    //   console.log(error)
    // });
  }

  render() {
    return (
      <BootstrapTable data={this.GetData()} striped hover>
        <TableHeaderColumn isKey dataField='Id'>Id</TableHeaderColumn>
        <TableHeaderColumn dataField='SysId'>SysId</TableHeaderColumn>
        <TableHeaderColumn dataField='Name'>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='Priority'>Priority</TableHeaderColumn>
        <TableHeaderColumn dataField='CreateDate'>CreateDate</TableHeaderColumn>
        <TableHeaderColumn dataField='CreateUser'>CreateUser</TableHeaderColumn>
        <TableHeaderColumn dataField='UpdateDate'>UpdateDate</TableHeaderColumn>
        <TableHeaderColumn dataField='UpdateUser'>UpdateUser</TableHeaderColumn>

      </BootstrapTable>

    );
  }
}














///

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];


class JackyTest extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.GetData();
  }

  GetData() {
    const self = this;
    axios.get('api/Test/TestAPI').then((result) => {
      console.log(result.data)
    }).catch((error) => {
      console.log(error)
    });


    axios.post('api/Test/TestAPI3', {
      a: 10
    }).then((result) => {
      console.log(result.data)
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <BootstrapTable data={products} striped hover>
        <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>

      <Auth_View/>
      </div>
    );
  }
}
export default JackyTest;
