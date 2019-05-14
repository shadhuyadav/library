import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
	  var uname = 'devuser';
	  var pass = 'dev';
    axios.get('http://localhost:8102/library/api/listBooks/'+this.props.match.params.id,{
    	  auth: {
  		    Username: uname,
  		    Password: pass
  		  }})
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  delete(id){
    console.log(id);
    var uname = 'adminuser';
    var pass = 'admin';
    axios.delete('http://localhost:8102/library/api/deleteBook/'+id,{
  	  auth: {
		    Username: uname,
		    Password: pass
		  }})
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Books Details
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/show"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Books List</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.book.name}</dd>
              <dt>Edition:</dt>
              <dd>{this.state.book.edition}</dd>
              <dt>Price:</dt>
              <dd>{this.state.book.price}</dd>
              <dt>IssuedUser:</dt>
              <dd>{this.state.book.issuedUser}</dd>             
            </dl>
            <Link to={`/edit/${this.state.book.id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.book.id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
