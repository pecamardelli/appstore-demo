import React		from 'react';
import Joi			from 'joi-browser';
import { Link }		from 'react-router-dom';
import { toast }	from 'react-toastify';
import Form			from './common/forms/form';
import auth			from '../services/authService';

class LoginForm extends Form {
	state	= {
		data: { email: '', password: '' },
		errors: {}
	};
	
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
		return (<>
			<div className='row' style={{ marginTop: '10%' }}>
				<div className="card bg-light border-secondary mb-3 mx-auto" style={{ width: '25rem' }}>
					<div className="card-header">
						<h4 className="card-title">LOGIN</h4>
					</div>
					<div className="card-body">
						<form onSubmit={this.handleSubmit}>
							{ this.renderInput('email', 'Email', null, null, true) }
							{ this.renderInput('password', 'Password', 'password') }
							{ this.renderButton('Login') }
						</form>
					</div>
					<div className="card-footer bg-light border-secondary">
						Don't have a user yet? <Link to='/register'>Sign up!</Link>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default LoginForm;