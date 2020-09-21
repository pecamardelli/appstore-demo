import React		from 'react';
import Joi			from 'joi-browser';
import { Link }		from 'react-router-dom';
import { toast }	from 'react-toastify';
import { register }	from '../services/userService';
import Form from	'./common/form';
import auth from	'../services/authService';
import userObject	from '../includes/userObject';

class RegisterForm extends Form {
	state	= {
		data: userObject,
		errors: {}
	};
	
	roles	= [
		{ name: 'Client', id: 1 },
		{ name: 'Developer', id: 2 }
	];

	schema	= {
		firstname:	Joi.string().min(1).max(255).required().label('First name'),
		lastname:	Joi.string().min(1).max(255).required().label('Last name'),
		email:		Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email'),
		role:		Joi.string().min(1).max(255).required().label('Role'),
		username:	Joi.string().min(1).max(255).required().label('Username'),
		password:	Joi.string().min(8).max(64).required().label('Password'),
		confirmPassword: Joi.string().equal(Joi.ref('password')).min(8).max(64).required().options({
			language:{
				any: {
					allowOnly: ' does not match'
				}
			}
		}).label('Confirm password')
	};
	/*
	
		confirmPassword: Joi.string().equal(Joi.ref('password')).required().options({
			language:{
				any: {
					allowOnly: ' does not match'
				}
			}
		}).label('Confirm password')
	*/
	doSubmit = async() => {
		try {
			const new_user	= { ...this.state.data };
			const response	= await register(new_user);
			// The backend has to send the jason web token in order to login from here and
			// avoid the need of logging in from the form.
			// The web token can be on the header of the http response or within the body.
			auth.loginWithJwt(response.headers['x-auth-token']);
			toast.success(`User '${this.state.data.name}' succesfully registered!`);
			// Using the history object to move to the home page will not re-render the app component
			// We need to do a full page reload to update the navbar with the name of the logged in user
			// as well as the logout link.
			//this.props.history.push('/movies');
			window.location	= '/';
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.username	= ex.response.data;
				this.setState({ errors });
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		return (
			<React.Fragment>
				<h1>Register</h1>
				<div className='row'>
					<div className='col-5 mx-auto'>
						<form onSubmit={this.handleSubmit} >
							{ this.renderInput('firstname', 'First name') }
							{ this.renderInput('lastname', 'Last name') }
							{ this.renderInput('email', 'Email', 'email') }
							{ this.renderSelect('role', 'Role', this.roles) }
							{ this.renderInput('username', 'Username') }
							{ this.renderInput('password', 'Password', 'password')}
							{ this.renderInput('confirmPassword', 'Confirm password', 'password')}
							{ this.renderButton('Register') }
						</form>
						<br />Already registered? <Link to='/login'>Login</Link>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default RegisterForm;