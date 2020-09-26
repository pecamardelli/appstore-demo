import { Route, Switch, Redirect }  from 'react-router-dom';
import { toast, ToastContainer }           from 'react-toastify';
import React, { Fragment, useEffect, useState }          from 'react';
import ProductContainer      from './components/productContainer';
import ProtectedRoute	from './components/common/protectedRoute';
import RegisterForm   from './components/registerForm';
import CategoryForm   from './components/categoryForm';
import ProductForm    from './components/productForm';
import LoginForm      from './components/loginForm';
import WishList       from './components/user_menu/wishList';
import MyProducts     from './components/user_menu/myProducts';
import MyProfile      from './components/user_menu/myProfile';
import NotFound       from './components/common/not-found';
import NavBar         from './components/common/navBar';
import Logout			    from './components/user_menu/logout';
import Apps           from './components/apps';
import Movies         from './components/movies';
import Music          from './components/music';
import Books          from './components/books';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  
  return (
    <Fragment>
      <ToastContainer />
      <NavBar />
      <hr />
      <main className='container'>
        <Switch>
          <Route path='/register'   component={RegisterForm} />
          <Route path='/login'		  component={LoginForm} />
  
           { /*
          <Route path='/apps'       component={Apps} />
          <Route path='/movies'     component={Movies} />
          <Route path='/music'      component={Music} />
          <Route path='/books'      component={Books} />
          */}
          <Route
            path='/store/:product'
            render={props => <ProductContainer {...props} />}
          />
          <ProtectedRoute
            path='/categories'
            component={CategoryForm}
          />
          <ProtectedRoute
            path='/products'
            component={ProductForm}
          />
          <ProtectedRoute
            path='/me/wishlist'
            component={WishList}
          />
          <ProtectedRoute
            path='/me/products'
            component={MyProducts}
          />
          <ProtectedRoute
            path='/me/profile'
            component={MyProfile}
          />
          <Route path='/logout'     component={Logout} />
          <Route path='/not-found'	component={NotFound} />
          <Redirect from='/' to='/store' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
