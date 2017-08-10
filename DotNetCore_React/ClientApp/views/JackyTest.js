import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


import axios from 'axios';


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
    axios.get('api/WebApi/TestAPI').then((result) => {
      console.log(result.data)
    }).catch((error) => {
      console.log(error)
    });


    axios.post('api/WebApi/TestAPI3', {
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

      </div>
    );
  }
}
export default JackyTest;
