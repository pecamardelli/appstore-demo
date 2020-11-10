import React, { useState, useEffect, useContext, useRef }	from 'react';
import { Link, NavLink, useHistory }	from 'react-router-dom';
import { getSections }		from '../../services/sectionService';
import SearchContext		from './../../context/searchContext';
import { toast }	from 'react-toastify';
import logo			from '../../assets/images/logo100.png';
import auth			from '../../services/authService';
import UserMenu 	from '../user_menu/userMenu';
import SignMenu 	from './signMenu';
import Icons		from '../../assets/icons';

function NavBar(props) {
	const [ sections, setSections ]			= useState([]);
	const [ searchValue, setSearchValue]	= useState('');
	const [ currentUser, setCurrentUser ]	= useState(auth.getCurrentUser());
	const history		= useHistory();
	const searchContext	= useContext(SearchContext);
	const searchRef		= useRef(null);

	useEffect(() => {
		async function call() {
			try {
				const { data: sections }	= await getSections();
				setSections(sections);
			}
			catch(ex) {
				console.log(ex);
				toast.error('Could not retrieve sections from backend.');
			}
		}

	call();
	}, [ setSections ]);

	const handleChange	= ({ currentTarget: input }) => {
		setSearchValue(input.value);
	};

	const handleSearchClick	= () => {
		if(!searchValue) return toast.error('Enter some keywords and then search...');

		searchContext.setSearchKeywords(searchValue);
		searchRef.current.value	= '';

		if(window.location.pathname !== '/search'){
			return history.push('/search');
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
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

				<form className="form-inline mx-auto" style={{ width: '40%'}}>
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
						onChange={handleChange}
						style={{ width: '80%'}}
						ref={searchRef}
					/>
					<span className='' role='button' onClick={handleSearchClick}>
						{ Icons.searchIcon() }
					</span>
				</form>

				{ currentUser ? <UserMenu /> : <SignMenu /> }
			</div>
		</nav>
	);
}

export default NavBar;