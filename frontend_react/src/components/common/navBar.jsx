import React, { useState, useEffect }	from 'react';
import { Link, NavLink }	from 'react-router-dom';
import { getSections }		from '../../services/sectionService';
import { toast }	from 'react-toastify';
import logo			from '../../assets/images/logo100.png';
import auth			from '../../services/authService';
import UserMenu 	from '../user_menu/userMenu';
import SignMenu 	from './signMenu';

const NavBar	= (props) => {
	const [ currentUser, setUser ]	= useState(auth.getCurrentUser());
	const [ sections, setSections ] = useState([]);

	useEffect(() => {
		async function call() {
			try {
				const { data: sections }	= await getSections();
				setSections(sections);
			}
			catch(ex) {
				console.log(ex)
				toast.error('Could not retrieve sections from backend.', ex);
			}
		}

	call();
		
	}, [ setSections, setUser ]);

	return (
		<nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#ffddbb'}}>
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
					{ sections.map(
						p => <NavLink
								key={ p.id }
								className='nav-item nav-link'
								to={`/store/${p.displayName.toLowerCase()}`}>
									{ p.displayName }
								</NavLink>
					)}
				</ul>
			</div>
			{ currentUser ? <UserMenu username={ currentUser.username } /> : <SignMenu /> }
		</nav>
	);
}

export default NavBar;