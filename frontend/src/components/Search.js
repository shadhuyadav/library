import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      books: []
    };
  }
 
  onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	  }

  onSubmit = (e) => {
	    e.preventDefault();
	    var bookname = this.state.bookname;
	   
		  axios.get('http://localhost:8102/library/api/findBook/'+bookname)
	      .then(res => {
	    	  this.setState({ books: res.data });
	          console.log(this.state.books);
	        console.log(res);
	      });
	  }
  
  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Search Book
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Home</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="isbn">Book Name</label>
              <input type="text" class="form-control" 
            	  name="bookname" value={this.state.bookname} 
              	  onChange={this.onChange} 
              	  placeholder="Book Name" />
            </div>
            <button type = 'submit' class="btn btn-default">Submit</button> 
            </form>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Edition</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              {this.state.books.map(c =>
              <tr>
                <td>{c.name}</td>
                <td>{c.edition}</td>
                <td>{c.price}</td>
              </tr>
            )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
