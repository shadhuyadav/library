import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './App.css';
import Create from './components/Create';
import Show from './components/Show';
import Search from './components/Search';
import Update from './components/Update';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />        
        <Route path='/create' component={Create} />
        <Route path='/show' component={Show} />
        <Route path='/search' component={Search} />
        <Route path='/update' component={Update} />
      </div>
  </Router>,
  document.getElementById('root')
);
