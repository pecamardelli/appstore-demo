import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RegisterForm   from './components/registerForm';
import NotFound       from './components/common/not-found';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main className='container'>
        <Switch>
          <Route path='/register' component={RegisterForm} />
          <Route path='/not-found'	component={NotFound} />
          <Redirect from='/' to='/register' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
