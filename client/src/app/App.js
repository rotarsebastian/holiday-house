import React from 'react';
import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.App}>
      <h1>Hello HolidayHouse!</h1>
      <img src="https://holidayhouse1.s3.amazonaws.com/default.jpeg" alt='s3-img' />
    </div>
  );
}

export default App;
