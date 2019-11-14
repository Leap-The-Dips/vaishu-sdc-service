import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import queryString from 'query-string';
import App from './app';

const Gallery = (
  <Router>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(Gallery, document.getElementById('Gallery'));
