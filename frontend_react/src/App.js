import { Route, Switch, Redirect }  from 'react-router-dom';
import React, { useState }  from 'react';
import { ToastContainer }   from 'react-toastify';
import SectionContainer     from './components/sectionContainer';
import CategoryContainer    from './components/categoryContainer';
import ProductContainer     from './components/productContainer';
import SearchContainer      from './components/searchContainer';
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
import NotFound       from './components/common/notFound';
import NavBar         from './components/common/navBar';
import Footer         from './components/common/footer';
import Logout			    from './components/user_menu/logout';
import Home           from './components/home';
import SearchContext  from './context/searchContext';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [ searchKeywords, setSearchKeywords ] = useState('');

  return (
    <SearchContext.Provider value={{ setSearchKeywords }}>
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
            component={SectionContainer}
          />
          <Route
            path='/store/:section/:category'
            exact
            component={CategoryContainer}
          />
          <Route
            path='/store/:section/:category/:product'
            exact
            component={ProductContainer}
          />
          <Route
            path='/search'
            exact
            render={ props => <SearchContainer { ...props } keywords={searchKeywords} /> }
          />
          <ProtectedRoute
            path='/categories'
            exact
            component={CategoryForm}
            accessLevel='2'
          />
          <ProtectedRoute
            path='/categories/:id'
            exact
            component={CategoryForm}
            accessLevel='2'
          />
          <ProtectedRoute
            path='/sections'
            component={SectionForm}
            accessLevel='2'
          />
          <ProtectedRoute
            path='/me'
            exact
            component={MyProfile}
          />
          <ProtectedRoute
            path='/me/wishlist'
            exact
            component={WishList}
          />
          <ProtectedRoute
            path='/me/purchases'
            exact
            component={MyPurchases}
          />
          <ProtectedRoute
            path='/me/products'
            exact
            component={MyProducts}
            accessLevel='4'
          />
          <ProtectedRoute
            path='/me/products/new'
            exact
            component={ProductForm}
            accessLevel='4'
          />
          <ProtectedRoute
            path='/me/products/edit/:id'
            exact
            component={ProductForm}
            accessLevel='4'
          />
          <Route path='/logout'     exact component={Logout} />
          <Route path='/not-found'	exact component={NotFound} />
          <Route path='/'           exact component={Home} />
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer />
    </SearchContext.Provider>
  );
}

export default App;
