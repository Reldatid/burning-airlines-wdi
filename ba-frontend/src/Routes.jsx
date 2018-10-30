import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Search from './components/Search';
import SearchResults from './components/SearchResults';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Search}/>
      <Route exact path="/search/:query" component={SearchResults}/>
    </div>
  </Router>
);
export default Routes;
