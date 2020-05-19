import React from 'react';
import classes from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AddProperty from './pages/AddProperty/AddProperty';
import Profile from './pages/Profile/Profile'

const App = () => {
  return (
    <div className={classes.App}>
      <Router basename='/'> 
        <Header />
        <Switch>
          <Route exact path='/' component={props => <Home {...props} />} />
          <Route path='/addproperty' component={props => <AddProperty {...props} />} />
          <Route path='/profile' component={props => <Profile {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
