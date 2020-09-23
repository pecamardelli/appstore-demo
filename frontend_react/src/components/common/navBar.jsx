import React, { useState }	from 'react';
import { Link, NavLink }	from 'react-router-dom';
import logo		from '../../images/logo100.png';
import auth		from '../../services/authService';
import UserMenu from '../user_menu/userMenu';
import SignMenu from './signMenu';

const NavBar	= () => {
	const [ currentUser, setUser ]	= useState(auth.getCurrentUser());

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				<img
					src={logo}
					className="d-inline-block align-top"
					width="100"
					height="40"
					alt=""
					loading="lazy"
				/>
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
		
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<NavLink className='nav-item nav-link' to='/apps'>Apps</NavLink>
					<NavLink className='nav-item nav-link' to='/movies'>Movies</NavLink>
					<NavLink className='nav-item nav-link' to='/music'>Music</NavLink>
					<NavLink className='nav-item nav-link' to='/books'>Books</NavLink>
				</ul>
			</div>
			{ currentUser ? <UserMenu username={ currentUser.username } /> : <SignMenu /> }
		</nav>
	);
}

export default NavBar;