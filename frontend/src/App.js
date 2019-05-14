import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
	  var uname = 'devuser';
	  var pass = 'dev';
    axios.get('http://localhost:8102/library/api/listBooks',{
  	  auth: {
		    Username: uname,
		    Password: pass
		  }})
      .then(res => {
        this.setState({ books: res.data });
        console.log(this.state.books);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOKS LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Book</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Edition</th>
                  <th>Price</th>
                  <th>IssuedUser</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(c =>
                  <tr>
                    <td><Link to={`/show/${c.id}`}>{c.name}</Link></td>
                    <td>{c.edition}</td>
                    <td>{c.price}</td>
                    <td>{c.issuedUser}</td>
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

export default App;
