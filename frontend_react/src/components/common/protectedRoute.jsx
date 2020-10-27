/*	
 *	Protecting routes...
 *
 *	Unauthenticated users will be redirected to the login page.
 *	Unauthorized users will be redirected to the not-found page.
 *
*/

import { Route, Redirect }	from 'react-router-dom';
import { toast }			from 'react-toastify';
import auth		from '../../services/authService';
import React	from 'react';

const ProtectedRoute	= ({ component: Component, render, accessLevel, ...rest }) => {
	const user	= auth.getCurrentUser();
	return (
		<Route
			{...rest}
			render={props => {
				if(!user) {
					toast.error('Unauthorized, baby! Please log in.');
					return (
						<Redirect to={{
							pathname: '/login',
							state: { from: props.location }
							}}
						/>
					);
				}
				if(accessLevel && user.accessLevel > accessLevel) {
					return (
						<Redirect to={{
							pathname: '/not-found',
							state: { from: props.location }
							}}
						/>
					);
				}
				return Component ? <Component {...props} /> : render=(props);
			}}
		/>
	);
};

export default ProtectedRoute;