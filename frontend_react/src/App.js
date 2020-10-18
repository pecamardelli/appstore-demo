import { Route, Switch, Redirect }  from 'react-router-dom';
import React, { Fragment }  from 'react';
import { ToastContainer }   from 'react-toastify';
import SectionContainer     from './components/sectionContainer';
import CategoryContainer    from './components/categoryContainer';
import ProductContainer     from './components/productContainer';
import ProtectedRoute	from './components/common/protectedRoute';
import RegisterForm   from './components/registerForm';
import CategoryForm   from './components/categoryForm';
import SectionForm    from './components/sectionForm';
import ProductForm    from './components/productForm';
import LoginForm      from './components/loginForm';
import MyPurchases    from './components/user_menu/myPurchases';
import MyProducts     from './components/user_menu/myProducts';
import MyProfile      from './components/user_menu/myProfile';
import WishList       from './components/user_menu/myWishList';
import NotFound       from './components/common/not-found';
import NavBar         from './components/common/navBar';
import Logout			    from './components/user_menu/logout';
import Home           from './components/home';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/register'   component={RegisterForm} />
          <Route path='/login'		  component={LoginForm} />
          <Route
            path='/store'
            exact
            component={Home}
          />
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
            exact
            component={CategoryForm}
          />
          <ProtectedRoute
            path='/categories/:id'
            exact
            component={CategoryForm}
          />
          <ProtectedRoute
            path='/sections'
            component={SectionForm}
          />
          <ProtectedRoute
            path='/me'
            exact
            component={MyProfile}
          />
          <ProtectedRoute
            path='/me/wishlist'
            component={WishList}
          />
          <ProtectedRoute
            path='/me/purchases'
            component={MyPurchases}
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
            path='/me/products/edit/:id'
            component={ProductForm}
          />
          <Route path='/logout'     component={Logout} />
          <Route path='/not-found'	component={NotFound} />
          <Route path='/' exact     component={Home} />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
