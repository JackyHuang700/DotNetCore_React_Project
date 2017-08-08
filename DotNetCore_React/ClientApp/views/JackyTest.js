import React, { Component } from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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

constructor (props) {
  super(props);
  // this.GetData = this.GetData.bind(this);
  
}

componentDidMount(){
  console.log(`data`);
  this.GetData();
}

GetData(){
  const self = this;
  axios.get('api/Base/TestAPI').then((result)=>{
    console.log(result.data)
  }).catch((error)=>{
    console.log(error)
  });


  axios.post('api/Base/TestAPI3', {
    a: 10
  }).then((result)=>{
    console.log(result.data)
  }).catch((error)=>{
    console.log(error)
  });
}

	render() {
		return (
   <BootstrapTable data={products} striped hover>
      <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
  </BootstrapTable>
    );
	}
}
export default JackyTest;
