import React, { Fragment }	from 'react';
import { submitCategory }	from './../services/categoryService';
import { getProducts }	from '../services/productService';
import { toast }		from 'react-toastify';
import Form 			from './common/forms/form';
import Joi				from 'joi-browser';

class CategoryForm extends Form {
	state	= {
		data: 		{},
		products:	[],
		errors:		{}
	};
	
	async componentDidMount() {
		try {
			const { data: products }	= await getProducts();
			this.setState({ products });
		}
		catch(ex) {
			console.log(ex);
		}
	}

	schema	= {
		productId:		Joi.number().min(1).max(255).required().label('Product'),
		displayName:   	Joi.string().min(1).max(255).required().label('Name'),
		description:   	Joi.string().min(5).max(255).required().label('Description')
	};
	
	doSubmit = async() => {
		try {
			const newCategory	= { ...this.state.data };
			await submitCategory(newCategory)
			toast.success(`Category '${this.state.data.name}' succesfully submitted!`);
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
							<h4 className="card-title">Add new category</h4>
						</div>
						<div className="card-body">
							<form onSubmit={this.handleSubmit} >
								{ this.renderSelect('productId', 'Product', this.state.products) }
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

export default CategoryForm;