import { Route, Switch, Redirect }  from 'react-router-dom';
import { ToastContainer }           from 'react-toastify';
import React, { Fragment }          from 'react';
import ProtectedRoute	from './components/common/protectedRoute';
import RegisterForm   from './components/registerForm';
import CategoryForm   from './components/categoryForm';
import LoginForm      from './components/loginForm';
import NotFound       from './components/common/not-found';
import Logout			    from './components/logout';
import NavBar         from './components/common/navBar';
import Apps           from './components/apps';
import Movies         from './components/movies';
import Music          from './components/music';
import Books          from './components/books';
//import UserContext    from './context/userContext';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //const [ user, setUser ] = useState({});
  
  return (
    <Fragment>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/register'   component={RegisterForm} />
          <Route path='/login'		  component={LoginForm} />
          <Route path='/apps'       component={Apps} />
          <Route path='/movies'     component={Movies} />
          <Route path='/music'      component={Music} />
          <Route path='/books'      component={Books} />
          <ProtectedRoute
            path='/categories'
            component={CategoryForm}
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
