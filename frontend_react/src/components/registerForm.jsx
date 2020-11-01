import { register, getSignupRoles }	from '../services/userService';
import React		from 'react';
import ImageUpload	from './common/forms/imageUpload';
import { Link }		from 'react-router-dom';
import { toast }	from 'react-toastify';
import Joi			from 'joi-browser';
import auth 		from '../services/authService';
import Form 		from './common/forms/form';
//import userObject	from '../includes/userObject';

class RegisterForm extends Form {
	state	= {
		data:	{},
		roles:	[],
		errors: {}
	};
	
	async componentDidMount() {
		try {
			const { data: roles}	= await getSignupRoles();
			this.setState({ roles });
		}
		catch (ex) {
			toast.error(`Error retrieving roles: ${ex}`);
		}
	}

	schema	= {
		firstname:	Joi.string().min(1).max(255).required().label('First name'),
		lastname:	Joi.string().min(1).max(255).required().label('Last name'),
		email:		Joi.string().email({
			minDomainSegments: 2,
			tlds: {
				allow: [ 'com', 'net' ]
			}
		}).required().label('Email'),
		RoleId:		Joi.string().min(1).max(255).required().label('Role'),
		username:	Joi.string().min(1).max(32).required().label('Username'),
		password:	Joi.string().min(8).max(64).required().label('Password'),
		confirmPassword: Joi.string().equal(Joi.ref('password')).min(8).max(64).required().options({
			language:{
				any: {
					allowOnly: ' does not match'
				}
			}
		}).label('Confirm password'),
		photo:   	Joi.any().label('Photo')
	};
	
	doSubmit = async() => {
		try {
			const newUser	= {
				...this.state.data,
				role: this.state.roles.find(e => e.id === this.state.data.RoleId)
			};
			
			const response	= await register(newUser);
			// The backend has to send the jason web token in order to login from here and
			// avoid the need of logging in from the form.
			// The web token can be on the header of the http response or within the body.
			auth.loginWithJwt(response.data);
			toast.success(`User '${this.state.data.name}' succesfully registered!`);
			// Using the history object to move to the home page will not re-render the app component
			// We need to do a full page reload in order to update the navbar with the name of the logged in user
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
		
		return (<>
			<br /><h3>Sign up to the AppStore!</h3><hr />
			<div className="card border-dark mb-3" style={{width: '100%'}}>
				<div className="row no-gutters">
					<div className="col-md-4">
						<ImageUpload
							onImageUpdate={this.handleImageUpdate}
							imageId={ this.state.data ? this.state.data.id : null }
							title='Avatar'
							path='/users'
						/>
					</div>
					<div className="col-md-8" style={{height: '90%'}}>
						<div className="card-header">
							<strong>SIGN UP!</strong>
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="card-body">
								{ this.renderInput('firstname', 'First name') }
								{ this.renderInput('lastname', 'Last name') }
								{ this.renderInput('email', 'Email', 'email') }
								{ this.renderSelect('RoleId', 'Role', this.state.roles) }
								{ this.renderInput('username', 'Username') }
								{ this.renderInput('password', 'Password', 'password')}
								{ this.renderInput('confirmPassword', 'Confirm password', 'password')}
							</div>
							<div className="card-footer text-muted bg-transparent d-flex justify-content-between align-items-center">
								<span></span>
								{ this.state.data.id ? this.renderButton('Update') : this.renderButton('Register') }
								<span>Already registered? <Link to='/login'>Sign in!</Link></span>
							</div>
						</form>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default RegisterForm;