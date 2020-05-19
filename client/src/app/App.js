import React from 'react';
import classes from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './components/Login/Login';
import AddProperty from './pages/AddProperty/AddProperty';

const App = () => {
  return (
    <div className={classes.App}>
      <Router basename='/'> 
        <Header />
        <Switch>
          <Route exact path='/' component={props => <Home {...props} />} />
          <Route path='/addproperty' component={props => <AddProperty {...props} />} />
          <Route path="/login" component={Login} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
