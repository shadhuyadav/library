import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Update extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };    
  }
  
  componentDidMount() {
	  var temp = this.props.location.pathname;
	var id = temp.substring(8);	 
	this.state.book.id=id;
    axios.get('http://localhost:8102/library/api/getBook/'+this.state.book.id)
      .then(res => {
        this.setState({ book: res.data });
        console.log(this.state.book);
      });
  }

  onChange = (e) => {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, edition, price, issuedUserId } = this.state.book;
    var uname = 'adminuser';
    var pass = 'admin';
    axios.put('http://localhost:8102/library/api/updateBook/'+this.state.book.id, { name, edition, price, issuedUserId },{
  	  auth: {
		    username: uname,
		    password: pass
		  }})
      .then((result) => {
    	  alert("successfull updated")
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              UPDATE BOOK
            </h3>
          </div>
          <div class="panel-body">
          <h4><Link to="/"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Home</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.book.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="title">Edition:</label>
                <input type="text" class="form-control" name="edition" value={this.state.book.edition} onChange={this.onChange} placeholder="Edition" />
              </div>
              <div class="form-group">
                <label for="author">Price:</label>
                <input type="text" class="form-control" name="price" value={this.state.book.price} onChange={this.onChange} placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="published_date">IssuedUserId:</label>
                <input type="text" class="form-control" name="issuedUserId" value={this.state.book.issuedUserId} onChange={this.onChange} placeholder="IssuedUserId" />                    
              </div>
             <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
