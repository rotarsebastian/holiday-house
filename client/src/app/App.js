import React, { useEffect } from 'react';
import classes from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import AddEditProperty from './pages/AddEditProperty/AddEditProperty';
import Profile from './pages/Profile/Profile'
import PropertiesResults from './pages/PropertiesResults/PropertiesResults';
import toastr from 'toastr';
import toastrSetup from './helpers/toastrSettings';
import auth, { checkAuth } from './helpers/auth';
import { withStore } from 'react-context-hook';
import { useStore, useSetStoreValue } from 'react-context-hook';
// import { useStoreState } from 'react-context-hook';
import ClipLoader from 'react-spinners/ClipLoader';
import Property from './pages/PropertyPage/PropertyPage'

// const Test = () => {
//   const globalState = useStoreState()
//   return (
//     <section style={{ position: 'fixed', bottom: 0, left: 0 }}>
//       <pre>
//         <code id="global-state">{JSON.stringify(globalState, null, ' ')}</code>
//       </pre>
//     </section>
//   )
// }

const App = () => {
  toastr.options = toastrSetup;
  const [ isAuthenticated, setIsAuthenticated ] = useStore('isAuthenticated', undefined);
  const setUser = useSetStoreValue('user');

  useEffect(() => {
    const checkIfLogged = async() => {
        const res = await checkAuth();
        
        if(res.status === 1) {
          setIsAuthenticated(true);
          setUser(res.user);
        } else setIsAuthenticated(false);    
    }
    checkIfLogged();

  }, [setIsAuthenticated, setUser]);

  if(isAuthenticated === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>
  else {
    return (
      <div className={classes.App}>
        <Router basename='/'> 
          <Header />
          {/* <Test /> */}
          <div className={classes.Root}>
          <Switch>
            <Route exact path='/' component={props => <Home {...props} />} />
            <Route path='/propertiesresults' component={props => <PropertiesResults {...props} />} />
            <PrivateRoute path='/handleproperty/:id' component={props => <AddEditProperty from={'Edit'} {...props} />} />
            <PrivateRoute path='/handleproperty' component={props => <AddEditProperty {...props} />} />
            <PrivateRoute path='/profile' component={props => <Profile {...props}/>} />
            <Route path='/property/:id' component={props => <Property {...props} />} />
          </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}

const initialState = auth;

export default withStore(App, initialState);
