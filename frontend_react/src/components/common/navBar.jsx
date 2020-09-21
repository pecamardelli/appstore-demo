import { Link, NavLink }	from 'react-router-dom';
import React	from 'react';
import logo		from '../../images/logo100.png';
import auth		from '../../services/authService';

const NavBar	= ({ user }) => {
	if(auth.getCurrentUser()) {
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
						<NavLink className='nav-item nav-link' to='/apps'>Home</NavLink>
						<NavLink className='nav-item nav-link' to='/apps'>My profile</NavLink>
						<NavLink className='nav-item nav-link' to='/apps'>New app</NavLink>
						{user &&
							<React.Fragment>
								<NavLink className='nav-item nav-link' to='/me'>{user.name}</NavLink>
								<NavLink className='nav-item nav-link' to='/logout'>Logout</NavLink>
							</React.Fragment>
						}
					</ul>
				</div>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
					<button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
				</form>
			</nav>
		);
	}
	else { return null }
}

export default NavBar;