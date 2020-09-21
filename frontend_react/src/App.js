import { Route, Switch, Redirect }  from 'react-router-dom';
import { ToastContainer }           from 'react-toastify';
import React, { Fragment }          from 'react';
import ProtectedRoute	from './components/common/protectedRoute';
import RegisterForm   from './components/registerForm';
import LoginForm      from './components/loginForm';
import NotFound       from './components/common/not-found';
import Logout			    from './components/logout';
import NavBar         from './components/common/navBar';
import Apps           from './components/apps';
import auth           from './services/authService';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <NavBar user='Pablin'/>
      <main className='container'>
        <Switch>
          <Route path='/register'   component={RegisterForm} />
          <Route path='/login'		  component={LoginForm} />
          <ProtectedRoute
            path='/apps'
            component={Apps}
          />
          <Route path='/logout'     component={Logout} />
          <Route path='/not-found'	component={NotFound} />
          <Redirect from='/' to='/apps' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
