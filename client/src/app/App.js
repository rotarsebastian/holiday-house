import React, { useEffect } from 'react';
import classes from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AddProperty from './pages/AddProperty/AddProperty';
import Profile from './pages/Profile/Profile'
import PropertiesResults from './pages/PropertiesResults/PropertiesResults';
import toastr from 'toastr';
import toastrSetup from './helpers/toastrSettings';
import auth, { checkAuth } from './helpers/auth';
import { withStore } from 'react-context-hook';
import { useStore, useSetAndDelete, useSetStoreValue } from 'react-context-hook';
import { useStoreState } from 'react-context-hook';
import ClipLoader from 'react-spinners/ClipLoader';
import Property from './pages/PropertyPage/PropertyPage'

function Test() {
  const globalState = useStoreState()
  return (
    <section style={{ position: 'fixed', bottom: 0, left: 0 }}>
      <pre>
        <code id="global-state">{JSON.stringify(globalState, null, ' ')}</code>
      </pre>
    </section>
  )
}

const App = () => {
  toastr.options = toastrSetup;
  const [loggedUser, setLoggedUser] = useStore('email', undefined);
  const [setIsAuthenticated] = useSetAndDelete('isAuthenticated');
  const [setLoggedID] = useSetAndDelete('userID');
  // const setObject = useSetStoreValue('profile_data');

  useEffect(() => {
    const checkIfLogged = async() => {
        const res = await checkAuth();
        console.log(res);
        if(res.status === 1) {
          setIsAuthenticated(true);
          setLoggedUser(res.data.email);
          setLoggedID(res.data.id);
          // setObject(res.data);
        } else setLoggedUser('Guest');    
    }
    checkIfLogged();

  }, [setLoggedUser, setIsAuthenticated, setLoggedID]);

  if(loggedUser === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>
  else {
    return (
      <div className={classes.App}>
        <Router basename='/'> 
          <Header />
          <Test />
          <Switch>
            <Route exact path='/' component={props => <Home {...props} />} />
            <Route path='/propertiesresults' component={props => <PropertiesResults {...props} />} />
            <Route path='/addproperty' component={props => <AddProperty {...props} />} />
            <Route path='/profile' component={props => <Profile {...props} />} />
            <Route path='/property' component={props => <Property {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const initialState = auth;

export default withStore(App, initialState);
