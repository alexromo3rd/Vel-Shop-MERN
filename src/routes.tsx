import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUp/SignUp';

export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route exact path='/signup' component={SignUp} />
    <Route path='/shop' component={Shop} />
  </Switch>
);
