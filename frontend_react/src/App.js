import { Route, Switch, Redirect }  from 'react-router-dom';
import { ToastContainer }           from 'react-toastify';
import React, { Fragment }          from 'react';
import RegisterForm   from './components/registerForm';
import LoginForm      from './components/loginForm';
import NotFound       from './components/common/not-found';
import apps           from './components/apps';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <main className='container'>
        <Switch>
          <Route path='/register'   component={RegisterForm} />
          <Route path='/login'		  component={LoginForm} />
          <Route path='/apps'       component={apps} />
          <Route path='/not-found'	component={NotFound} />
          <Redirect from='/' to='/apps' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
