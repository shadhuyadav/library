import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
	  var uname = 'devuser';
	  var pass = 'dev';
    axios.get('http://localhost:8102/library/api/findBook/'+this.props.match.params.id,{
  	  auth: {
		    Username: uname,
		    Password: pass
		  }})
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

    const { name, edition, price, issuedUser } = this.state.book;
    var uname = 'adminuser';
    var pass = 'admin';
    axios.put('http://localhost:8102/library/api/updateBook'+this.props.match.params.id, { name, edition, price, issuedUser },{
  	  auth: {
		    Username: uname,
		    Password: pass
		  }})
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOOK
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.book.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Book List</Link></h4>
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
                <label for="published_date">IssuedUser:</label>
                <input type="text" class="form-control" name="issuedUser" value={this.state.book.issuedUser} onChange={this.onChange} placeholder="IssuedUser" />                    
              </div>
             <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
