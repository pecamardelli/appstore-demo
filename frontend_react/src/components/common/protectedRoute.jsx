/*	
 *	This component implements a prtected route.
 *
 *	Unauthenticated users cannot access the component passed as an argument.
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