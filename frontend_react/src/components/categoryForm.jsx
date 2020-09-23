import React, { Fragment }	from 'react';
import Joi			from 'joi-browser';
import { toast }	from 'react-toastify';
import auth 		from '../services/authService';
import Form 		from './common/form';

class CategoryForm extends Form {
	state	= {
		data: {},
		errors: {}
	};
	
	products	= [
		{ name: 'Application', id: 1 },
		{ name: 'Movie', id: 2 },
		{ name: 'Music', id: 3 },
		{ name: 'Book', id: 4 }
	];

	schema	= {
		product:	Joi.string().min(1).max(255).required().label('Product'),
		name:   	Joi.string().min(1).max(255).required().label('Name')
	};
	
	doSubmit = async() => {
		try {
            console.log('Submitting:', this.state.data)
            /*
			const new_user	= { ...this.state.data };
            const response	= await register(new_user);
            
			auth.loginWithJwt(response.data);
            toast.success(`User '${this.state.data.name}' succesfully registered!`);
            
            window.location	= '/';
            */
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.category	= ex.response.data;
				this.setState({ errors });
				return toast.error(`Error: ${ex.response.data}`);	
			}
		}
	};
	
	render() {
		return (
			<Fragment>
				<div className='row' style={{ marginTop: '10%' }}>
					<div className="card bg-light border-secondary mb-2 mx-auto" style={{ width: '35rem' }}>
						<div className="card-header">
							<h4 className="card-title">Add new category</h4>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} >
								{ this.renderSelect('product', 'Product', this.products) }
								{ this.renderInput('name', 'Name') }
								{ this.renderButton('Add') }
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default CategoryForm;