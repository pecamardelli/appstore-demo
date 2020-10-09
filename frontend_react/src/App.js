import { Route, Switch, Redirect }  from 'react-router-dom';
import { ToastContainer }           from 'react-toastify';
import React, { Fragment }          from 'react';
import SectionContainer             from './components/sectionContainer';
import CategoryContainer            from './components/categoryContainer';
import ProductContainer             from './components/productContainer';
import ProtectedRoute	from './components/common/protectedRoute';
import RegisterForm   from './components/registerForm';
import CategoryForm   from './components/categoryForm';
import SectionForm    from './components/sectionForm';
import ProductForm    from './components/productForm';
import LoginForm      from './components/loginForm';
import WishList       from './components/user_menu/wishList';
import MyProducts     from './components/user_menu/myProducts';
import MyProfile      from './components/user_menu/myProfile';
import NotFound       from './components/common/not-found';
import NavBar         from './components/common/navBar';
import Logout			    from './components/user_menu/logout';

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
          <Route
            path='/store/:section'
            exact
            render={ props => <SectionContainer { ...props } /> }
          />
          <Route
            path='/store/:section/:category'
            exact
            render={ props => <CategoryContainer { ...props } /> }
          />
          <Route
            path='/store/:section/:category/:product'
            exact
            render={ props => <ProductContainer { ...props } /> }
          />
          <ProtectedRoute
            path='/categories'
            component={CategoryForm}
          />
          <ProtectedRoute
            path='/sections'
            component={SectionForm}
          />
          <ProtectedRoute
            path='/me/wishlist'
            component={WishList}
          />
          <ProtectedRoute
            path='/me/products'
            exact
            component={MyProducts}
          />
          <ProtectedRoute
            path='/me/products/new'
            component={ProductForm}
          />
          <ProtectedRoute
            path='/me/profile'
            component={MyProfile}
          />
          <Route path='/logout'     component={Logout} />
          <Route path='/not-found'	component={NotFound} />
          <Redirect from='/' exact to='/store' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
