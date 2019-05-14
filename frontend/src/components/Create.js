import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      edition: '',
      price: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { name, edition, price} = this.state;
    var uname = 'adminuser';
    var pass = 'admin';
    axios.post('http://localhost:8102/library/api/addBook', { name, edition, price},{
    	  auth: {
    		    username: uname,
    		    password: pass
    		  }})
      .then((result) => {
    	  this.props.history.push("/")
        
      });
  }

  render() {
    const { name, edition, price } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Home</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="title">Edition:</label>
                <input type="text" class="form-control" name="edition" value={edition} onChange={this.onChange} placeholder="Edition" />
              </div>
              <div class="form-group">
                <label for="author">Price:</label>
                <input type="text" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
              </div>
             
              <button type="submit" class="btn btn-default">Submit</button>              
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
