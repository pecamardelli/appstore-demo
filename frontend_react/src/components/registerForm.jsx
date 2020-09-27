import React, { Fragment }		from 'react';
import { register, getRoles }	from '../services/userService';
import Joi			from 'joi-browser';
import { Link }		from 'react-router-dom';
import { toast }	from 'react-toastify';
import auth 		from '../services/authService';
import Form 		from './common/forms/form';
import userObject	from '../includes/userObject';


class RegisterForm extends Form {
	state	= {
		data:	userObject,
		roles:	[],
		errors: {}
	};
	
	async componentDidMount() {
		const { data: roles}	= await getRoles();
		this.setState({ roles });
	}

	schema	= {
		firstname:	Joi.string().min(1).max(255).required().label('First name'),
		lastname:	Joi.string().min(1).max(255).required().label('Last name'),
		email:		Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Email'),
		roleId:		Joi.string().min(1).max(255).required().label('Role'),
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
	
	doSubmit = async() => {
		try {
			const new_user	= { ...this.state.data };
			console.log(new_user)
			const response	= await register(new_user);
			// The backend has to send the jason web token in order to login from here and
			// avoid the need of logging in from the form.
			// The web token can be on the header of the http response or within the body.
			console.log(response)
			//auth.loginWithJwt(response.headers['x-auth-token']);
			auth.loginWithJwt(response.data);
			toast.success(`User '${this.state.data.name}' succesfully registered!`);
			// Using the history object to move to the home page will not re-render the app component
			// We need to do a full page reload to update the navbar with the name of the logged in user
			// as well as the user menu.
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
		if(auth.getCurrentUser()) {
			toast.error('Cannot register while logged in!');
			this.props.history.push('/apps');
			return null;
		}
		else return (
			<Fragment>
				<div className='row' style={{ marginTop: '1%' }}>
					<div className="card bg-light border-secondary mb-2 mx-auto" style={{ width: '35rem' }}>
						<div className="card-header">
							<h4 className="card-title">SIGN UP!</h4>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} >
								{ this.renderInput('firstname', 'First name') }
								{ this.renderInput('lastname', 'Last name') }
								{ this.renderInput('email', 'Email', 'email') }
								{ this.renderSelect('roleId', 'Role', this.state.roles) }
								{ this.renderInput('username', 'Username') }
								{ this.renderInput('password', 'Password', 'password')}
								{ this.renderInput('confirmPassword', 'Confirm password', 'password')}
								{ this.renderButton('Register') }
							</form>
						</div>
						<div className="card-footer bg-light border-secondary">
							Already registered? <Link to='/login'>Sign in!</Link>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default RegisterForm;