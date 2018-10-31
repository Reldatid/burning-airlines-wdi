import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Flight from './components/Flight';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={Search}/>
      <Route path="/search" component={Search}/>
      <Route exact path="/search/:query" component={SearchResults}/>
      <Route exact path="/flight/:id" component={Flight}/>
    </div>
  </Router>

);
export default Routes;
