import React, { Fragment }	from 'react';
import { submitProduct }	from './../services/productService';
import { toast }		from 'react-toastify';
import Form 			from './common/forms/form';
import Joi				from 'joi-browser';

class ProductForm extends Form {
	state	= {
		data: 		{},
		errors:		{}
	};

	schema	= {
		displayName:   	Joi.string().min(1).max(255).required().label('Name'),
		description:   	Joi.string().min(5).max(255).required().label('Description')
	};
	
	doSubmit = async () => {
		try {
			const newProduct	= { ...this.state.data };
			await submitProduct(newProduct);
			toast.success(`Product '${this.state.data.name}' succesfully submitted!`);
		}
		catch (ex) {
			if(ex.response && ex.response.status === 400) {
				const errors	= { ...this.state.errors };
				errors.category	= ex.response.data;
				this.setState({ errors });	
			}

			return toast.error(`Error: ${ex.response.data}`);
		}
	};
	
	render() {
		return (
			<Fragment>
				<div className='row' style={{ marginTop: '5%' }}>
					<div className="card bg-light border-secondary mb-2 mx-auto" style={{ width: '35rem' }}>
						<div className="card-header">
							<h4 className="card-title">Add new product</h4>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} >
								{ this.renderInput('displayName', 'Name') }
								{ this.renderTextArea('description', 'Description') }
								{ this.renderButton('Add') }
							</form>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ProductForm;