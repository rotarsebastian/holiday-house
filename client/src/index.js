import React from 'react';
// import ReactDOM from 'react-dom';
import './root/index.css';
import App from './app/App';
import * as serviceWorker from './root/serviceWorker';
import { hydrate, render } from 'react-dom';
 
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
