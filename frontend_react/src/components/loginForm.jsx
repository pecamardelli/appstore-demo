import React		from 'react';
import Joi			from 'joi-browser';
import { Link }		from 'react-router-dom';
import { toast }	from 'react-toastify';
import Form			from './common/form';
import auth			from '../services/authService';

class LoginForm extends Form {
	state	= {
		data: { email: '', password: '' },
		errors: {}
	};
	
	//username	= React.createRef();
	
	componentDidMount() {
		// Use refs only when necessary. In this case, using the autoFocus atributte would be a better choice
		//this.username.current.focus();
	}
	
	schema	= {
		email:		Joi.string().min(5).max(64).required().email().label('Email'),
		password:	Joi.string().min(8).max(64).required().label('Password')
	};
	
	doSubmit = async () => {
		try {
			const the_user	= { ...this.state.data };
			await auth.login(the_user);
			toast.success(`Login succesfull!`);
			// Using the history object to move to the home page will not re-render the app component
			// We need to do a full page reload to update the navbar with the name of the logged in user
			// as well as the logout link.
			//this.props.history.push('/movies');			
			//
			const { state }	= this.props.location;
			window.location	= state ? state.from.pathname : '/';
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.email	= ex.response.data;
				this.setState({ errors });
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		//if(auth.getCurrentUser()) return <Redirect to='/movies' />;
		/*
		if(auth.getCurrentUser()) {
			toast.error('You already are logged in, klutz!');
			return <Redirect to='/movies' />;
		}
		*/

		return (
			<React.Fragment>
				<h1>Login</h1>
				<div className='row'>
					<div className='col-4 mx-auto'>
						<form onSubmit={this.handleSubmit}>
							{ this.renderInput('email', 'Email', null, null, true) }
							{ this.renderInput('password', 'Password', 'password') }
							{ this.renderButton('Login') }
						</form>
						<br />Don't have a user yet? <Link to='/register'>Register</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default LoginForm;