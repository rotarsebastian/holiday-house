import React from 'react';
import classes from './App.module.css';
import Login from './components/Login/Login'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    // <div className={classes.App}>
    //   <h1>Hello HolidayHouse!</h1>
    //   <img src="https://holidayhouse1.s3.amazonaws.com/default.jpeg" alt='s3-img' />
    // </div>
  
    <BrowserRouter>
    <main>
      <Switch>
        <Route path="/login" component={Login} exact />
      </Switch>
    </main>
  </BrowserRouter>  
  );
}

export default App;
