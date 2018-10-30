import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Reservation from './components/Reservation';

const Routes = (
  <Router>
    <div>
      <Route path="/" component={Search}/>
      <Route exact path="/search/:query" component={SearchResults}/>
      <Route exact path="/reservation/:id" component={Reservation}/>
    </div>
  </Router>

);
export default Routes;
